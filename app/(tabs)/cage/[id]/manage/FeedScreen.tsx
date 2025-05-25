import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, View, ScrollView, StyleSheet, Text } from 'react-native';
import { colors } from '@/constants';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useGetFeedRecord } from '@/hooks/useGetFeedRecord';
import { useGetAllFeedRecords } from '@/hooks/useGetAllFeedRecords';
import AlertCycleCard from './components/AlertCycleCard';
import FeedRecordCard from './components/FeedRecordCard';
import FeedDetailModal from '@/components/FeedDetailModal';
import CustomCalendar from './components/CustomCalendar';
import FeedModal from './addFeed';
import CustomButton from '@/components/PrimaryButton';
import dayjs from 'dayjs';
import { usePetContext } from '@/contexts/PetContext';

export default function FeedScreen() {
  const { id } = useLocalSearchParams();
  const petId = id as string;
  const [startDate, setStartDate] = useState<string | null>(null); //조회할 시작 날짜
  const [endDate, setEndDate] = useState<string | null>(null); //조회할 마지막 날짜

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [feedVisible, setFeedVisible] = useState(false);

  const [dDay, setDDay] = useState<number>(0);
  const [recentDate, setRecentDate] = useState<string | null>(null);
  const [nextDate, setNextDate] = useState<string | null>(null);
  const [interval, setInterval] = useState<number>(1);

  const intervalRef = useRef(interval);

  const { feedCycleData, setFeedCycleData } = usePetContext();
  const storedCycleData = feedCycleData[petId];

  const { data: feedData, isLoading, refetch } = useGetFeedRecord(
    petId,
    selectedDate.format('YYYY-MM-DD')
  );

  useEffect(() => {
    const today = dayjs();
    const lastYear = today.subtract(1, 'year');

    setStartDate(lastYear.format('YYYY-MM-DD'));
    setEndDate(today.format('YYYY-MM-DD'));
  }, []);

  //전체 급여기록 조회
  const { data: allData, error } = useGetAllFeedRecords({
    cageId: petId,
    startDate: startDate ?? '',
    endDate: endDate ?? '',
  });

  // data가 바뀔 때마다 최근 날짜 찾기
  useEffect(() => {
    if (!startDate || !endDate) return;
    console.log('📌 호출 조건 만족' + startDate + endDate);
    console.log('📦 allData:', allData);
    if (allData && allData.length > 0) {
      const sorted = allData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setRecentDate(sorted[0].date);
    }
  }, [allData, setRecentDate, startDate, endDate]);

  const updateFeedCycleData = (newInterval: number) => {
    setInterval(newInterval);

    // recentDate가 있으면 context에서 계산되도록 넘기기
    if (recentDate) {
      setFeedCycleData(petId, {
        recentDate, // YYYY-MM-DD 포맷이면 그대로 전달
        interval: newInterval,
      });
    } else {
      // recentDate가 없으면 recentDate는 null, interval만 넘기기
      setFeedCycleData(petId, {
        recentDate: null,
        interval: newInterval,
      });
    }
  };

  const displayRecentDate = storedCycleData?.recentDate ? dayjs(storedCycleData.recentDate).format('MM/DD') : '등록 필요';
  const displayFeedingInterval = storedCycleData?.interval ?? 0;
  const displayNextDate = storedCycleData?.nextDate ? dayjs(storedCycleData.nextDate).format('MM/DD') : '-';
  const displayDDay = storedCycleData?.dDay ?? 0;

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  if (isLoading) {
    return <Text>로딩중</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AlertCycleCard
          recentDate={
            displayRecentDate
          }
          nextDate={
            displayNextDate
          }
          dDay={displayDDay}
          interval={displayFeedingInterval}
          onSelectInterval={updateFeedCycleData}
          onPressCycle={() => { }}
          onPressAlert={() => { }}
        />
        <CustomCalendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {feedData?.date && (
          <FeedRecordCard
            onPress={() => setFeedVisible(true)}
            data={{
              date: feedData.date,
              food_type: feedData.food_type,
              food_size: feedData.food_size,
              food_amount: feedData.food_amount,
              amount_unit: feedData.amount_unit,
              memo: feedData.memo,
            }}
          />
        )}

        <View style={{ height: 80 }} />
      </ScrollView>

      <CustomButton
        title='추가하기'
        onPress={openModal}
      />

      {feedData?.date && feedData?.food_type && (
        <FeedDetailModal
          visible={feedVisible}
          onClose={() => setFeedVisible(false)}
          refetch={refetch}
          data={{
            id: feedData.id,
            date: feedData.date,
            food_type: feedData.food_type,
            food_size: feedData.food_size,
            food_amount: feedData.food_amount,
            amount_unit: feedData.amount_unit,
            memo: feedData.memo,
          }}
        />
      )}

      <FeedModal
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
    alignItems: 'center',
    marginBottom: 15,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 50,
  },
});
