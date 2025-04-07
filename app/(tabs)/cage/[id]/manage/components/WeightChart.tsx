import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { colors } from '@/constants';

const screenWidth = Dimensions.get('window').width;

export default function WeightChart() {
  const chartData = {
    labels: ['11.12', '11.27', '12.12'],
    datasets: [{ data: [4, 5, 4.5] }],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.chartTitle}>잉크 몸무게 추이</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 32}
        height={200}
        chartConfig={{
          backgroundColor: colors.WHITE,
          backgroundGradientFrom: colors.WHITE,
          backgroundGradientTo: colors.WHITE,
          decimalPlaces: 1,
          color: () => colors.BLUE_500,
          labelColor: () => colors.GRAY_700,
        }}
        bezier
        style={{ borderRadius: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
  chartTitle: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
});
