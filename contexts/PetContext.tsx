import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CycleData {
  recentDate: string | null;
  dDay: number;
  interval: number;
  nextDate: string | null;
}

interface PetContextType {
  petId: string | null;
  setPetId: (id: string) => void;
  feedCycleData: { [key: string]: CycleData };
  cleanCycleData: { [key: string]: CycleData };
  setFeedCycleData: (id: string, data: CycleData) => void;
  setCleanCycleData: (id: string, data: CycleData) => void;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider = ({ children }: { children: ReactNode }) => {
  const [petId, setPetId] = useState<string | null>(null);
  const [feedCycleData, setFeedCycleDataState] = useState<{ [key: string]: CycleData }>({});
  const [cleanCycleData, setCleanCycleDataState] = useState<{ [key: string]: CycleData }>({});

  // 초기 로딩 시 AsyncStorage에서 데이터 가져오기
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedFeedData = await AsyncStorage.getItem('feedCycleData');
        const storedCleanData = await AsyncStorage.getItem('cleanCycleData');
        if (storedFeedData) setFeedCycleDataState(JSON.parse(storedFeedData));
        if (storedCleanData) setCleanCycleDataState(JSON.parse(storedCleanData));
      } catch (error) {
        console.error('Error loading cycle data:', error);
      }
    };
    loadData();
  }, []);

  // 데이터 변경 시 AsyncStorage에 저장
  useEffect(() => {
    AsyncStorage.setItem('feedCycleData', JSON.stringify(feedCycleData));
    AsyncStorage.setItem('cleanCycleData', JSON.stringify(cleanCycleData));
  }, [feedCycleData, cleanCycleData]);

  // 개별 도마뱀 ID의 Cycle Data 업데이트 함수
  const setFeedCycleData = (id: string, data: CycleData) => {
    setFeedCycleDataState((prevState) => ({
      ...prevState,
      [id]: data,
    }));
  };

  const setCleanCycleData = (id: string, data: CycleData) => {
    setCleanCycleDataState((prevState) => ({
      ...prevState,
      [id]: data,
    }));
  };

  return (
    <PetContext.Provider
      value={{
        petId,
        setPetId,
        feedCycleData,
        cleanCycleData,
        setFeedCycleData,
        setCleanCycleData,
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
    throw new Error('usePetContext must be used within a PetProvider');
  }
  return context;
};
