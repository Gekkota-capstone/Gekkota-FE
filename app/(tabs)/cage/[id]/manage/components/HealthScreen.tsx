import { useLocalSearchParams, Stack, router } from 'expo-router';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import HealthCalendar from './HealthCalendar';
import WeightChart from './WeightChart';
import HealthRecordCard from './HealthRecordCard';
import { colors } from '@/constants';
import { useState } from 'react';
import HealthDetailSheet from '@/components/HealthDetailSheet';

export default function HealthScreen() {
  const { id } = useLocalSearchParams();
  const [healthVisible, setHealthVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* 스크롤 영역 */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <WeightChart />
        <HealthCalendar />
        <HealthRecordCard onPress={() => setHealthVisible(true)} />
        {/* 여백 공간 확보 */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* 하단 고정 버튼 */}
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push(`/cage/${id}/manage/addHealth`)}
        >
          <Text style={styles.addButtonText}>추가하기</Text>
        </TouchableOpacity>
      </View>

      <HealthDetailSheet
        visible={healthVisible}
        onClose={() => setHealthVisible(false)}
        data={{
          date: '2024.12.08',
          weight: '6g',
          memo: '네 번째 발가락 확인 필요...',
          photoUri: 'https://example.com/photo.jpg',
        }}
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
    paddingBottom: 50, // 버튼 높이 + 여유
  },
  fixedButtonContainer: {
    backgroundColor: colors.WHITE,
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  addButton: {
    backgroundColor: colors.BLUE_500,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
});
