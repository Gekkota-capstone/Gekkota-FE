import { usePetContext } from '@/contexts/PetContext';
import { useGetAllFeedRecords } from '@/hooks/useGetAllFeedRecords';
import { useGetFeedRecord } from '@/hooks/useGetFeedRecord';
import dayjs from 'dayjs';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AlertCycleCard from './components/AlertCycleCard';
import CustomCalendar from './components/CustomCalendar';
import FeedRecordCard from './components/FeedRecordCard';
import FeedDetailModal from '@/components/FeedDetailModal';
import FeedModal from './addFeed';
import { colors } from '@/constants';
import PrimaryButton from '@/components/PrimaryButton';

export default function FeedScreen() {
  const { id } = useLocalSearchParams();
  const petId = id as string;
  const [startDate, setStartDate] = useState<string | null>(null); //조회할 시작 날짜
  const [endDate, setEndDate] = useState<string | null>(null); //조회할 마지막 날짜

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [recentDate, setRecentDate] = useState<string | null>(null);
  const [interval, setInterval] = useState<number>(1);
  const [selectedFeed, setSelectedFeed] = useState<any | null>(null);

  //전체 급여기록 조회
  const { data: allData, refetch } = useGetAllFeedRecords({
    cageId: petId,
    startDate: startDate ?? '',
    endDate: endDate ?? '',
  });

  const { data: feedData, isLoading } = useGetFeedRecord(
    petId, 
    selectedDate.format('YYYY-MM-DD')
  );


  const { feedCycleData, setFeedCycleData } = usePetContext();
  if (!petId || !feedCycleData) return null;
  const storedCycleData = feedCycleData[petId];


  useEffect(() => {
    const today = dayjs();
    const lastYear = today.subtract(1, 'year');

    setStartDate(lastYear.format('YYYY-MM-DD'));
    setEndDate(today.format('YYYY-MM-DD'));
  }, [feedCycleData]);

  useEffect(() => {
    console.log('급여 storedCycleData:', storedCycleData);
  }, [storedCycleData]);

  // data가 바뀔 때마다 최근 날짜 찾기
  useEffect(() => {
    if (!startDate || !endDate) return;
    console.log('📌 급여 호출 조건 만족' + startDate + endDate);
    console.log('📦 급여 allData:', allData);
    if (allData && allData.length > 0) {
      const sorted = allData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setFeedCycleData(petId, {
        recentDate,
        interval: storedCycleData?.interval,
      });
      setRecentDate(sorted[0].date);
    }
  }, [allData, recentDate, setRecentDate, startDate, endDate]);

  const handleAfterDelete = async () => {
    const { data: updatedData } = await refetch();
    if (updatedData && updatedData.length > 0) {
      const sorted = updatedData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      const latestDate = sorted[0].date;
      setFeedCycleData(petId, {
        recentDate: latestDate,
        interval: storedCycleData?.interval,
      });
    } else {
      // 기록이 하나도 없으면 recentDate를 null 또는 기본값으로 설정
      setFeedCycleData(petId, {
        recentDate: null,
        interval,
      });
    }
  };

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

  const displayRecentDate = recentDate
    ? dayjs(storedCycleData.recentDate).format('MM/DD')
    : '등록 필요';
  const displayFeedingInterval = storedCycleData?.interval ?? 0;
  const displayNextDate = storedCycleData?.nextDate
    ? dayjs(storedCycleData.nextDate).format('MM/DD')
    : '-';
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
          onSelectInterval={updateFeedCycleData}
          onPressCycle={() => { }}
          onPressAlert={() => { }}
        />
        <CustomCalendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {/* feedData가 배열일 때 map 사용 */}
        {Array.isArray(feedData) && feedData.length > 0 ? (
          feedData.map((item) => {
            if (!item.food_type) return null;
            return (
              <FeedRecordCard
                key={item.id + item.food_type}
                onPress={() => setSelectedFeed(item)}
                data={{
                  date: item.date,
                  food_type: item.food_type,
                  food_size: item.food_size,
                  food_amount: item.food_amount,
                  amount_unit: item.amount_unit,
                  memo: item.memo,
                }}
              />
            );
          })
        ) : (
          <Text>급여 기록이 없습니다.</Text>
        )}
      </ScrollView>

      {selectedFeed && (
        <FeedDetailModal
          visible={!!selectedFeed}
          onClose={() => setSelectedFeed(null)}
          data={{
            id: selectedFeed.id,
            date: selectedFeed.date,
            food_type: selectedFeed.food_type,
            food_size: selectedFeed.food_size || '',
            food_amount: selectedFeed.food_amount || 0,
            amount_unit: selectedFeed.amount_unit || '',
            memo: selectedFeed.memo || '',
          }}
          onDeleted={handleAfterDelete}
        />
      )}
      <PrimaryButton
        title='추가하기'
        onPress={openModal}
      />
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
