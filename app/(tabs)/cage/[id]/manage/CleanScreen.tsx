import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, View, ScrollView, StyleSheet, Text } from 'react-native';
import { colors } from '@/constants';
import React, { useDebugValue, useEffect, useState } from 'react';
import AlertCycleCard from './components/AlertCycleCard';
import CustomCalendar from './components/CustomCalendar';
import ModalComponent from '@/app/(tabs)/cage/[id]/manage/addClean';
import { useGetCleanRecord } from '@/hooks/useGetCleanRecord';
import { useGetAllCleanRecords } from '@/hooks/useGetAllCleanRecords';
import CleanDetailModal from '@/components/CleanDetailModal';
import CleanRecordCard from './components/CleanRecordCard';
import PrimaryButton from '@/components/PrimaryButton';
import dayjs from 'dayjs';
import { usePetContext } from '@/contexts/PetContext';

export default function CleanScreen() {
  const { id } = useLocalSearchParams();
  const petId = id as string;
  const [cleanVisible, setCleanVisible] = useState(false); //청소기록
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [recentDate, setRecentDate] = useState<string | null>(null);
  const [interval, setInterval] = useState<number>(() => {
    return storedCycleData?.interval ?? 1;
  });


  const [startDate, setStartDate] = useState<string | null>(null); //조회할 시작 날짜
  const [endDate, setEndDate] = useState<string | null>(null); //조회할 마지막 날짜

  const { cleanCycleData, setCleanCycleData } = usePetContext();
  const storedCycleData = cleanCycleData[petId];

  const { data: cleanData, isLoading } = useGetCleanRecord(
    petId,
    selectedDate.format('YYYY-MM-DD')
  );

  // startDate, endDate 초기화 (최근 1년치)
  useEffect(() => {
    const today = dayjs();
    const lastYear = today.subtract(1, 'year');

    setStartDate(lastYear.format('YYYY-MM-DD'));
    setEndDate(today.format('YYYY-MM-DD'));
  }, []);

  //전체 청소기록 조회
  const { data: allData, refetch } = useGetAllCleanRecords({
    cageId: petId,
    startDate: startDate ?? '',
    endDate: endDate ?? '',
  });

  useEffect(() => {
    updateCleanCycleData(storedCycleData?.interval); // 처음 마운트되었을 때 실행
  }, []);


  // data가 바뀔 때마다 최근 날짜 찾기
  useEffect(() => {
  if (!startDate || !endDate) return;
  if (allData && allData.length > 0) {
    const sorted = allData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const latest = sorted[0].date;
    setRecentDate(latest);
    setCleanCycleData(petId, {
      recentDate: latest,
      interval: storedCycleData.interval
    });
  } else {
    setRecentDate(null);
    setCleanCycleData(petId, {
      recentDate: null,
      interval,
    });
  }
}, [allData, startDate, endDate, interval]);  // interval도 의존성 추가



  const handleAfterDelete = async () => {
    const { data: updatedData } = await refetch(); // 최신 데이터를 받아옴
    if (updatedData && updatedData.length > 0) {
      const sorted = updatedData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      const latestDate = sorted[0].date;
      setCleanCycleData(petId, {
        recentDate: latestDate,
        interval: storedCycleData?.interval,
      });
    } else {
      // 기록이 하나도 없으면 recentDate를 null 또는 기본값으로 설정
      setCleanCycleData(petId, {
        recentDate: null,
        interval,
      });
    }
  };


  const updateCleanCycleData = (newInterval: number) => {
    setInterval(newInterval);

    // recentDate가 있으면 context에서 계산되도록 넘기기
    if (recentDate) {
      setCleanCycleData(petId, {
        recentDate, // YYYY-MM-DD 포맷이면 그대로 전달
        interval: newInterval,
      });
    } else {
      // recentDate가 없으면 recentDate는 null, interval만 넘기기
      setCleanCycleData(petId, {
        recentDate: null,
        interval: newInterval,
      });
    }
  };

  const displayRecentDate = storedCycleData?.recentDate && dayjs(storedCycleData.recentDate).isValid()
    ? dayjs(storedCycleData.recentDate).format('MM/DD')
    : '등록 필요';

  const displayNextDate = storedCycleData?.nextDate && dayjs(storedCycleData.nextDate).isValid()
    ? dayjs(storedCycleData.nextDate).format('MM/DD')
    : '-';

  const displayFeedingInterval = storedCycleData?.interval;

  const displayDDay = storedCycleData?.dDay ?? 'D-Day';

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  if (isLoading) {
    return <Text>로딩중</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AlertCycleCard
          recentDate={displayRecentDate}
          nextDate={displayNextDate}
          dDay={displayDDay}
          interval={displayFeedingInterval}
          onSelectInterval={updateCleanCycleData}
          onPressCycle={() => { }}
          onPressAlert={() => { }}
        />
        <CustomCalendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {cleanData?.memo && (
          <CleanRecordCard
            onPress={() => setCleanVisible(true)}
            data={{
              date: cleanData.date,
              memo: cleanData.memo,
            }}
          />
        )}
      </ScrollView>

      {cleanData?.memo && (
        <CleanDetailModal
          visible={cleanVisible}
          onClose={() => setCleanVisible(false)}
          data={{
            id: cleanData.id,
            date: cleanData.date,
            memo: cleanData.memo,
          }}
          onDeleted={handleAfterDelete}
        />
      )}

      <PrimaryButton
        title='추가하기'
        onPress={openModal}
      />

      <ModalComponent
        isVisible={isModalVisible}
        onClose={closeModal}
        selectedDate={selectedDate.format('YYYY-MM-DD')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 15,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 50,
  },
});
