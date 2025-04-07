import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useState } from 'react';
import { colors } from '@/constants';
import dayjs from 'dayjs';

const screenWidth = Dimensions.get('window').width;

export default function WeightChart() {
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const today = dayjs();

  const dateRange =
    period === 'monthly'
      ? `${today.startOf('month').format('YYYY.MM.DD')} ~ ${today.endOf('month').format('YYYY.MM.DD')}`
      : `${today.startOf('year').format('YYYY.MM.DD')} ~ ${today.endOf('year').format('YYYY.MM.DD')}`;
  const monthlyData = {
    labels: ['11.12', '11.27', '12.11'],
    datasets: [{ data: [4, 4.5, 2] }],
  };

  const yearlyData = {
    labels: ['1월', '3월', '5월', '7월', '9월', '11월'],
    datasets: [{ data: [3, 3.5, 7, 4.5, 5, 2] }],
  };

  const chartData = period === 'monthly' ? monthlyData : yearlyData;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>잉크 몸무게 추이</Text>

      {/* 기간 선택 탭 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, period === 'monthly' && styles.tabActive]}
          onPress={() => setPeriod('monthly')}
        >
          <Text
            style={period === 'monthly' ? styles.tabTextActive : styles.tabText}
          >
            월간
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, period === 'yearly' && styles.tabActive]}
          onPress={() => setPeriod('yearly')}
        >
          <Text
            style={period === 'yearly' ? styles.tabTextActive : styles.tabText}
          >
            연간
          </Text>
        </TouchableOpacity>
      </View>

      {/* 선택된 날짜 범위 (옵션) */}
      <Text style={styles.dateRange}>{dateRange}</Text>

      {/* 차트 */}
      <LineChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: colors.WHITE,
          backgroundGradientFrom: colors.WHITE,
          backgroundGradientTo: colors.WHITE,
          decimalPlaces: 1,
          color: () => colors.BLUE_500,
        }}
        bezier
        style={{ marginTop: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 16, paddingHorizontal: 16 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.GRAY_100,
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.WHITE,
    borderBottomWidth: 2,
    borderBottomColor: colors.BLUE_500,
  },
  tabText: {
    fontSize: 14,
    color: colors.GRAY_500,
  },
  tabTextActive: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.BLUE_500,
  },
  dateRange: {
    fontSize: 12,
    color: colors.GRAY_500,
    marginTop: 12,
    marginBottom: 8,
  },
});
