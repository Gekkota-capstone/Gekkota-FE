import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, View, ScrollView, StyleSheet, Text } from 'react-native';
import { colors } from '@/constants';
import React, { useEffect, useState } from 'react';
import AlertCycleCard from './components/AlertCycleCard';
import CustomCalendar from './components/CustomCalendar';
import ModalComponent from '@/app/(tabs)/cage/[id]/manage/addClean';
import { useGetCleanRecord } from '@/hooks/useGetCleanRecord';
import CleanDetailModal from '@/components/CleanDetailModal';
import CleanRecordCard from './components/CleanRecordCard';
import CustomButton from '@/components/PrimaryButton';
import dayjs from 'dayjs';
import { usePetContext } from '@/contexts/PetContext';

export default function CleanScreen() {
  const { id } = useLocalSearchParams();
  const petId = id as string;
  const [cleanVisible, setCleanVisible] = useState(false); //청소기록
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [dDay, setDDay] = useState<number>(0);
  const [recentDate, setRecentDate] = useState<string | null>(null);
  const [nextDate, setNextDate] = useState<string | null>(null);
  const [interval, setInterval] = useState<number>(1);

  const { cleanCycleData, setCleanCycleData } = usePetContext();
  const storedCycleData = cleanCycleData[petId];

  const { data: cleanData, isLoading } = useGetCleanRecord(
    id as string,
    selectedDate.format('YYYY-MM-DD')
  );
  const { data: allData = {} } = useGetCleanRecord(id as string);

  console.log(cleanData);
  if (isLoading) {
    return <Text>로딩중</Text>;
  }

  const updateCleanCycleData = (newInterval: number) => {
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
      setCleanCycleData(petId, {
        recentDate,
        nextDate: calculatedNextDate,
        dDay: difference > 0 ? difference : 0,
        interval: newInterval,
      });
    } else {
      // 만약 recentDate가 없을 경우
      setNextDate(null);
      setDDay(0);
      setCleanCycleData(petId, {
        recentDate: null,
        nextDate: null,
        dDay: 0,
        interval: newInterval,
      });
    }
  };

  useEffect(() => {
    if (allData && typeof allData === 'object' && Object.keys(allData).length > 0) {
      const sortedFeedRecords = Object.values(allData).sort((a, b) => {
        const dateA = dayjs(a.date);
        const dateB = dayjs(b.date);
        if (!dateA.isValid() || !dateB.isValid()) {
          console.error('Invalid date format:', a.date, b.date);
          return 0;
        }
        return dateB.isBefore(dateA) ? -1 : 1;
      });

      const recentFeedDate = sortedFeedRecords[0]?.date;
      setRecentDate(recentFeedDate);

      if (recentFeedDate) {
        const calculatedNextDate = dayjs(recentFeedDate)
          .add(interval, 'day')
          .format('YYYY/MM/DD');

        if (dayjs(calculatedNextDate).isBefore(dayjs(), 'day')) {
          // 현실 날짜보다 이전일 경우 일단 0으로 설정. 후에 알림문구 띄우는걸로 변경
        } else {
          const difference = dayjs(calculatedNextDate).startOf('day').diff(dayjs().startOf('day'), 'day');
          setRecentDate(recentFeedDate);
          setNextDate(calculatedNextDate);
          setDDay(difference > 0 ? difference : 0);
          setInterval(interval);

          // 컨텍스트에 저장
          setCleanCycleData(petId, {
            recentDate: recentFeedDate,
            nextDate: calculatedNextDate,
            dDay: difference > 0 ? difference : 0,
            interval: interval,
          });
        }
      } else {
        setRecentDate(null);
        setNextDate(null);
        setDDay(0);
        setInterval(0);
        setCleanCycleData(petId, {
          recentDate: null,
          nextDate: null,
          dDay: 0,
          interval: 0
        });
      }
    }
  }, [allData, interval]);

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
          recentDate={displayRecentDate ? dayjs(displayRecentDate).format('MM/DD') : '-'}
          nextDate={displayNextDate ? dayjs(displayNextDate).format('MM/DD') : '-'}
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

        {cleanData && (
          <CleanRecordCard
            onPress={() => setCleanVisible(true)}
            data={{
              date: cleanData.date,
              memo: cleanData.memo,
            }}
          />
        )}
      </ScrollView>

      {cleanData && (
        <CleanDetailModal
          visible={cleanVisible}
          onClose={() => setCleanVisible(false)}
          data={{
            id: cleanData.id,
            date: cleanData.date,
            memo: cleanData.memo,
          }}
        />
      )}

      <CustomButton
        title='추가하기'
        onPress={openModal}
      />

      <ModalComponent
        isVisible={isModalVisible}
        onClose={closeModal}
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
    justifyContent: 'center',
    marginBottom: 15,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 50,
  },
});
