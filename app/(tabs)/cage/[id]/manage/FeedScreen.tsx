import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, View, ScrollView, StyleSheet, Text } from 'react-native';
import { colors } from '@/constants';
import React, { useEffect, useState } from 'react';
import { useGetFeedRecord } from '@/hooks/useGetFeedRecord';
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
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [feedVisible, setFeedVisible] = useState(false);

  const [dDay, setDDay] = useState<number>(0);
  const [recentDate, setRecentDate] = useState<string | null>(null);
  const [nextDate, setNextDate] = useState<string | null>(null);
  const [interval, setInterval] = useState<number>(1);

  const { feedCycleData, setFeedCycleData } = usePetContext();
  // 컨텍스트에서 저장된 데이터 불러오기
  const storedCycleData = feedCycleData[petId];

  const { data: feedData, isLoading } = useGetFeedRecord(
    id as string,
    selectedDate.format('YYYY-MM-DD')
  );

  if (isLoading) {
    return <Text>로딩중</Text>;
  }

  const updateFeedCycleData = (newInterval: number) => {
    setInterval(newInterval);

    if (recentDate) {
      const calculatedNextDate = dayjs(recentDate)
        .add(newInterval, 'day')
        .format('YYYY/MM/DD');

      const difference = dayjs(calculatedNextDate)
        .startOf('day')
        .diff(dayjs().startOf('day'), 'day');

      // 상태 업데이트
      setNextDate(calculatedNextDate);
      setDDay(difference > 0 ? difference : 0);

      // 컨텍스트에 동기화
      setFeedCycleData(petId, {
        recentDate,
        nextDate: calculatedNextDate,
        dDay: difference > 0 ? difference : 0,
        interval: newInterval,
      });
    } else {
      // 만약 recentDate가 없을 경우
      setNextDate(null);
      setDDay(0);
      setFeedCycleData(petId, {
        recentDate: null,
        nextDate: null,
        dDay: 0,
        interval: newInterval,
      });
    }
  };

  // useEffect(() => {
  //   if (allData && typeof allData === 'object' && Object.keys(allData).length > 0) {
  //     const sortedFeedRecords = Object.values(allData).sort((a, b) => {
  //       const dateA = dayjs(a.date);
  //       const dateB = dayjs(b.date);
  //       if (!dateA.isValid() || !dateB.isValid()) {
  //         console.error('Invalid date format:', a.date, b.date);
  //         return 0;
  //       }
  //       return dateB.isBefore(dateA) ? -1 : 1;
  //     });

  //     const recentFeedDate = sortedFeedRecords[0]?.date;
  //     setRecentDate(recentFeedDate);

  //     if (recentFeedDate) {
  //       const calculatedNextDate = dayjs(recentFeedDate)
  //         .add(interval, 'day')
  //         .format('YYYY/MM/DD');

  //       if (dayjs(calculatedNextDate).isBefore(dayjs(), 'day')) {
  //         // 현실 날짜보다 이전일 경우 일단 0으로 설정. 후에 알림문구 띄우는걸로 변경
  //       } else {
  //         const difference = dayjs(calculatedNextDate).startOf('day').diff(dayjs().startOf('day'), 'day');
  //         setRecentDate(recentFeedDate);
  //         setNextDate(calculatedNextDate);
  //         setDDay(difference > 0 ? difference : 0);
  //         setInterval(interval);

  //         // 컨텍스트에 저장
  //         setFeedCycleData(petId, {
  //           recentDate: recentFeedDate,
  //           nextDate: calculatedNextDate,
  //           dDay: difference > 0 ? difference : 0,
  //           interval: interval,
  //         });
  //       }
  //     } else {
  //       setRecentDate(null);
  //       setNextDate(null);
  //       setDDay(0);
  //       setInterval(0);
  //       setFeedCycleData(petId, {
  //         recentDate: null,
  //         nextDate: null,
  //         dDay: 0,
  //         interval: 0
  //       });
  //     }
  //   }
  // }, [allData]);

  const displayRecentDate = storedCycleData?.recentDate ?? recentDate;
  const displayNextDate = storedCycleData?.nextDate ?? nextDate;
  const displayDDay = storedCycleData?.dDay ?? dDay;
  const displayFeedingInterval = storedCycleData?.interval ?? interval;

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AlertCycleCard
          recentDate={
            displayRecentDate ? dayjs(displayRecentDate).format('MM/DD') : '-'
          }
          nextDate={
            displayNextDate ? dayjs(displayNextDate).format('MM/DD') : '-'
          }
          dDay={displayDDay}
          interval={displayFeedingInterval}
          onSelectInterval={updateFeedCycleData}
          onPressCycle={() => {}}
          onPressAlert={() => {}}
        />
        <CustomCalendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {Array.isArray(feedData) && feedData.length > 0 && (
          <FeedRecordCard
            onPress={() => setFeedVisible(true)}
            data={{
              date: feedData[0].date,
              food_type: feedData[0].food_type,
              food_size: feedData[0].food_size,
              food_amount: feedData[0].food_amount,
              amount_unit: feedData[0].amount_unit,
              memo: feedData[0].memo,
            }}
          />
        )}

        <View style={{ height: 80 }} />
      </ScrollView>

      <CustomButton
        title='추가하기'
        onPress={openModal}
      />

      {feedData && (
        <FeedDetailModal
          visible={feedVisible}
          onClose={() => setFeedVisible(false)}
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
