import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import { useGetList } from '@/hooks/useGetList';
interface Pet {
  pet_id: string;
  name: string;
}
interface CycleData {
  recentDate: string | null;
  dDay: string;
  interval: number;
  nextDate: string | null;
}

interface PetContextType {
  petId: string | null;
  setPetId: (id: string) => void;
  feedCycleData: { [key: string]: CycleData };
  cleanCycleData: { [key: string]: CycleData };
  setFeedCycleData: (id: string, data: Partial<CycleData>) => void;
  setCleanCycleData: (id: string, data: Partial<CycleData>) => void;

  pets: Pet[];
  setPets: React.Dispatch<React.SetStateAction<Pet[]>>;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider = ({ children }: { children: ReactNode }) => {
  const [petId, setPetId] = useState<string | null>(null);
  const [feedCycleData, setFeedCycleDataState] = useState<{ [key: string]: CycleData }>({});
  const [cleanCycleData, setCleanCycleDataState] = useState<{ [key: string]: CycleData }>({});

  const [pets, setPets] = useState<Pet[]>([]);

  const { data, isLoading, error } = useGetList();

  useEffect(() => {
    if (!isLoading && !error && data) {
      const petListRaw = Array.isArray(data) ? data : [data];
      // pet_id -> id 매핑
      const petList = petListRaw.map(pet => ({
        pet_id: pet.pet_id,
        name: pet.name,
        species: pet.species,
        gender: pet.gender,
        birthdate: pet.birthdate,
      }));
      setPets(petList);
    }
  }, [data, isLoading, error]);

  // 초기 로딩 시 AsyncStorage에서 데이터 가져오기
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedFeedData = await AsyncStorage.getItem('feedCycleData');
        const storedCleanData = await AsyncStorage.getItem('cleanCycleData');
        if (storedFeedData) setFeedCycleDataState(JSON.parse(storedFeedData));
        if (storedCleanData) setCleanCycleDataState(JSON.parse(storedCleanData));
        //console.log("청소 불러온 값:", storedCleanData);
        //console.log("급여 불러온 값:", storedFeedData);
      } catch (error) {
        console.error('Error loading cycle data:', error);
      }
    };
    loadData();
  }, []);

  // 데이터 변경 시 AsyncStorage에 저장
  useEffect(() => {
    if (Object.keys(feedCycleData).length > 0) {
      AsyncStorage.setItem('feedCycleData', JSON.stringify(feedCycleData));
      //console.log("급여 저장한 값 확인:", feedCycleData);
    }

    if (Object.keys(cleanCycleData).length > 0) {
      AsyncStorage.setItem('cleanCycleData', JSON.stringify(cleanCycleData));
      //console.log("청소 저장한 값 확인:", cleanCycleData);
    }
  }, [feedCycleData, cleanCycleData]);

  const calculateCycleData = (
    id: string,
    data: Partial<CycleData>,
    prevData: CycleData | undefined
  ): CycleData => {
    const today = dayjs().startOf('day');

    const recentDateStr = data.recentDate ?? prevData?.recentDate ?? null;
    const interval = data.interval ?? prevData?.interval ?? 0;

    const recentDate = recentDateStr ? dayjs(recentDateStr) : null;

    const nextDate = recentDate
      ? recentDate.add(interval, 'day')
      : null;

    const dayDiff = nextDate ? nextDate.diff(today, 'day') : 0;

    // 보기 편한 D-day 포맷
    let dDayLabel: string;
    if (dayDiff > 0) {
      dDayLabel = `D-${dayDiff}`;
    } else if (dayDiff === 0) {
      dDayLabel = 'D-day';
    } else {
      dDayLabel = `D+${Math.abs(dayDiff)}`;
    }

    return {
      recentDate: recentDate ? recentDate.format('YYYY-MM-DD') : null,
      interval,
      nextDate: nextDate ? nextDate.format('YYYY-MM-DD') : null,
      dDay: dDayLabel, // 여기서 포맷 적용
    };
  };


  // 개별 도마뱀 ID의 Cycle Data 업데이트 함수
  const setFeedCycleData = (id: string, data: Partial<CycleData>) => {
    setFeedCycleDataState(prevState => {
      const prev = prevState[id];

      const merged = {
        ...prev,
        ...data,
      };
      const calculated = calculateCycleData(id, merged, prev);

      return {
        ...prevState,
        [id]: calculated,
      };
    });
  };

  //nextDate와 dDay 계산
  const setCleanCycleData = (id: string, data: Partial<CycleData>) => {
    setCleanCycleDataState(prevState => {
      const prev = prevState[id];

      const merged = {
        ...prev,
        ...data,
      };
      const calculated = calculateCycleData(id, merged, prev);

      return {
        ...prevState,
        [id]: calculated,
      };
    });
  }

  return (
    <PetContext.Provider
      value={{
        petId,
        setPetId,
        feedCycleData,
        cleanCycleData,
        setFeedCycleData,
        setCleanCycleData,
        pets,
        setPets,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetProvider;

export const usePetContext = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
