import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';
import { colors } from '@/constants';
import React, { useState } from 'react';
import AlertCycleCard from './components/AlertCycleCard';
import CustomCalendar from './components/CustomCalendar';
import ModalComponent from '@/app/(tabs)/cage/[id]/manage/addClean';
import CustomButton from '@/components/PrimaryButton';
import dayjs from 'dayjs';

export default function CleanScreen() {
  const { id } = useLocalSearchParams();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AlertCycleCard
          recentDate='12/2'
          nextDate='12/8'
          dDay={1}
          alertText='7일 간격으로'
          onPressCycle={() => {}}
          onPressAlert={() => {}}
        />
        <CustomCalendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </ScrollView>

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
    alignItems: 'center',
  },
});
