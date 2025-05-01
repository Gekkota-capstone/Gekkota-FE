import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';
import { colors } from '@/constants';
import React, { useState } from 'react';
import { useGetFeedRecord } from '@/hooks/useGetFeedRecord'
import AlertCycleCard from './components/AlertCycleCard';
import FeedRecordCard from './components/FeedRecordCard';
import FeedDetailModal from '@/components/FeedDetailModal';
import CustomCalendar from './components/CustomCalendar';
import FeedModal from './addFeed';
import CustomButton from '@/components/PrimaryButton';
import dayjs from 'dayjs';

export default function FeedScreen() {
  const { id } = useLocalSearchParams();
  const [isModalVisible, setModalVisible] = useState(false); //추가
  const [selectedDate, setSelectedDate] = useState(dayjs()); 
  const [feedVisible, setFeedVisible] = useState(false); //급여기록

  const { data: feedData } = useGetFeedRecord(
    Number(id),
    selectedDate.format('YYYY-MM-DD')
  );

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AlertCycleCard
          recentDate='12/2'
          nextDate='12/8'
          dDay={1}
          alertText='3일 간격으로'
          onPressCycle={() => { }}
          onPressAlert={() => { }}
        />
        <CustomCalendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />


        {feedData && (
          <FeedRecordCard
            onPress={() => setFeedVisible(true)}
            data={{
              date: feedData.date,
              food_type: feedData.food_type,
              food_size: feedData.food_size,
              food_amount: feedData.food_amount,
              amount_unit: feedData.amount_unit,
              message: feedData.message
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
            message: feedData.message
          }}
        />
      )}

      <FeedModal
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
    alignItems: 'center',
    marginBottom: 15,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 50,
  },
});
