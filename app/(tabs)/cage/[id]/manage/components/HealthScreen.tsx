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
      <Stack.Screen
        options={{ title: '건강 관리', headerTitleAlign: 'center' }}
      />

      <ScrollView>
        {/* 몸무게 차트 */}
        <WeightChart />

        {/* 달력 컴포넌트 */}
        <HealthCalendar />

        {/* 예시 건강 기록 카드 */}
        <HealthRecordCard onPress={() => setHealthVisible(true)} />

        {/* 추가하기 버튼 */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push(`/cage/${id}/manage/addHealth`)}
        >
          <Text style={styles.addButtonText}>추가하기</Text>
        </TouchableOpacity>
      </ScrollView>
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
  container: { flex: 1, backgroundColor: colors.WHITE, paddingHorizontal: 16 },
  addButton: {
    backgroundColor: colors.BLUE_500,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  addButtonText: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
});
