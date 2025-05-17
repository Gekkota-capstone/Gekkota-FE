import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, View, ScrollView, StyleSheet, Text } from 'react-native';
import { colors } from '@/constants';
import React, { useState } from 'react';
import AlertCycleCard from './components/AlertCycleCard';
import CustomCalendar from './components/CustomCalendar';
import ModalComponent from '@/app/(tabs)/cage/[id]/manage/addClean';
import { useGetCleanRecord } from '@/hooks/useGetCleanRecord';
import CleanDetailModal from '@/components/CleanDetailModal';
import CleanRecordCard from './components/CleanRecordCard';
import CustomButton from '@/components/PrimaryButton';
import dayjs from 'dayjs';

export default function CleanScreen() {
  const { id } = useLocalSearchParams();
  const [cleanVisible, setCleanVisible] = useState(false); //청소기록
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const { data: cleanData, isLoading } = useGetCleanRecord(
    id as string,
    selectedDate.format('YYYY-MM-DD')
  );
  console.log(cleanData);
  if (isLoading) {
    return <Text>로딩중</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* <AlertCycleCard
          recentDate='12/2'
          nextDate='12/8'
          dDay={1}
          alertText='7일 간격으로'
          onPressCycle={() => {}}
          onPressAlert={() => {}}
        /> */}
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
