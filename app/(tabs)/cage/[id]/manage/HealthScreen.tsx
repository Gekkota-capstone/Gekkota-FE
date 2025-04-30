import { useLocalSearchParams, Stack, router } from 'expo-router';
import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native';
import { colors } from '@/constants';
import { useState } from 'react';
import CustomButton from '@/components/PrimaryButton';
import CustomCalendar from './components/CustomCalendar';
import dayjs from 'dayjs';
import { useGetHealthRecord } from '@/hooks/useGetHealthRecord';
import { useWeightHistory } from '@/hooks/useWeightHistory';
import HealthDetailModal from '@/components/HealthDetailModal';
import HealthRecordCard from './components/HealthRecordCard';
import WeightChart from './components/WeightChart';
import HealthModal from './addHealth';

export default function HealthScreen() {
  const { id } = useLocalSearchParams();
  const [healthVisible, setHealthVisible] = useState(false);

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const { data: healthData } = useGetHealthRecord(
    Number(id),
    selectedDate.format('YYYY-MM-DD')
  );

  const { data: weightData } = useWeightHistory(
    Number(id),
    selectedDate.format('YYYY-MM-DD')
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const openAddModal = () => setModalVisible(true);
  const closeAddModal = () => setModalVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* ✅ WeightChart에 data만 전달 */}
        {weightData && <WeightChart data={weightData} />}

        <CustomCalendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {healthData && (
          <HealthRecordCard
            onPress={() => setHealthVisible(true)}
            data={{
              date: healthData.date,
              weight: `${healthData.weight}g`,
              memo: healthData.memo,
              photoUri: healthData.photo_urls?.[0] ?? undefined,
              sheddingStatus: healthData.shedding_status,
            }}
          />
        )}

        <View style={{ height: 80 }} />
      </ScrollView>

      <View style={styles.fixedButtonContainer}>
        <CustomButton
          title='추가하기'
          onPress={openAddModal}
        />
      </View>

      {healthData && (
        <HealthDetailModal
          visible={healthVisible}
          onClose={() => setHealthVisible(false)}
          data={{
            id: healthData.id,
            date: healthData.date,
            weight: `${healthData.weight}g`,
            memo: healthData.memo,
            photoUri: healthData.photo_urls?.[0] ?? undefined,
            sheddingStatus: healthData.shedding_status,
          }}
        />
      )}
      <HealthModal
        isVisible={isModalVisible}
        onClose={closeAddModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    position: 'relative',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 50,
  },
  fixedButtonContainer: {
    backgroundColor: colors.WHITE,
    position: 'absolute',
    alignItems: 'center',
    bottom: 20,
    left: 16,
    right: 16,
  },
});
