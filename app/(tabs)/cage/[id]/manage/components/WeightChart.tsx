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

const screenWidth = Dimensions.get('window').width;

interface WeightDataPoint {
  day?: string;
  month?: string;
  value: number;
}

interface WeightChartProps {
  data: {
    monthOfWeight: WeightDataPoint[];
    yearOfWeight: WeightDataPoint[];
  };
}

export default function WeightChart({ data }: WeightChartProps) {
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const chunkSize = 5;
  const totalDays = data.monthOfWeight.length;
  const chartData =
    period === 'monthly'
      ? {
          labels: Array.from(
            { length: Math.ceil(totalDays / chunkSize) },
            (_, i) => {
              const startDay = data.monthOfWeight[i * chunkSize]?.day ?? '';
              const endDay =
                data.monthOfWeight[
                  Math.min(i * chunkSize + chunkSize - 1, totalDays - 1)
                ]?.day ?? '';
              return `${startDay}~${endDay}`;
            }
          ),
          datasets: [
            {
              data: Array.from(
                { length: Math.ceil(data.monthOfWeight.length / 5) },
                (_, i) => {
                  const chunk = data.monthOfWeight.slice(i * 5, i * 5 + 5);
                  const values = chunk
                    .map((d) => d.value)
                    .filter((v): v is number => v != null);
                  const avg = values.length
                    ? values.reduce((a, b) => a + b, 0) / values.length
                    : 0;
                  return +avg.toFixed(2);
                }
              ),
            },
          ],
        }
      : {
          labels: data.yearOfWeight.map((d) => d.month ?? ''),
          datasets: [{ data: data.yearOfWeight.map((d) => d.value ?? 0) }],
        };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>잉크 몸무게 추이</Text>

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
  container: { marginVertical: 10, paddingHorizontal: 16 },
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
});
