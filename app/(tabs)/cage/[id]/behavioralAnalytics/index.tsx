// BehavioralAnalyticsScreen.tsx

import { useBehaviorAnalytics } from '@/hooks/useBehaviorAnalytics';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Stack } from 'expo-router';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import CustomCalendar from '../manage/components/CustomCalendar';
import { colors } from '@/constants';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useLocalSearchParams } from 'expo-router/build/hooks';
export default function BehavioralAnalyticsScreen() {
  const { id } = useLocalSearchParams();
  const { width: screenWidth } = useWindowDimensions();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { data, isLoading } = useBehaviorAnalytics(
    Number(id),
    selectedDate.format('YYYY-MM-DD')
  );
  const [chartType, setChartType] = useState<'hourly' | 'daily'>('hourly');

  const videoPlayer = useVideoPlayer(
    data?.highlightVideoUrl ?? '',
    (player) => {
      player.loop = true;
      player.play();
    }
  );

  const hourly = data?.activityGraph.timeOfActivity || [];
  const daily = data?.activityGraph.recentDatOfActivit || [];

  const labels =
    chartType === 'hourly'
      ? hourly.map((item) => item.hour)
      : daily.map((item) => item.day);

  const values =
    chartType === 'hourly'
      ? hourly.map((item) => item.value)
      : daily.map((item) => item.value);

  const isAbnormal = !!data?.abnormalBehavior;

  const getTimeRangeLabel = (start: number, end: number) =>
    `${start < 12 ? `오전 ${start}` : `오후 ${start - 12}`}시 ~ ${
      end < 12 ? `오전 ${end}` : `오후 ${end - 12}`
    }시`;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Stack.Screen
          options={{ title: '행동분석', headerTitleAlign: 'center' }}
        />
        <CustomCalendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {/* 이상행동 경고 */}
        {isAbnormal ? (
          <View style={styles.warningBox}>
            <Text style={styles.warningTitle}>이상 행동</Text>
            <Text style={styles.warningDesc}>{data.abnormalBehavior}</Text>
          </View>
        ) : (
          <View style={styles.safeBox}>
            <Text style={styles.safeText}>이상행동 없음</Text>
          </View>
        )}

        {/* 하이라이트 영상 */}
        {data?.highlightVideoUrl && (
          <View style={styles.patternBox}>
            <Text style={styles.heatmapTitle}>하이라이트 영상</Text>
            <View style={styles.videoContainer}>
              <VideoView
                style={styles.video}
                player={videoPlayer}
                allowsFullscreen
                allowsPictureInPicture
              />
            </View>
          </View>
        )}

        {/* 생체 패턴 */}
        {data?.bioPattern && (
          <View style={styles.patternBox}>
            <Text style={styles.patternTitle}>생체 패턴</Text>
            <Text>
              기상:{' '}
              {getTimeRangeLabel(
                data.bioPattern.wakeUp.start,
                data.bioPattern.wakeUp.end
              )}
            </Text>
            <Text>
              수면:{' '}
              {getTimeRangeLabel(
                data.bioPattern.sleep.start,
                data.bioPattern.sleep.end
              )}
            </Text>
            <Text style={styles.subPattern}>
              *최다 활동 시간:{' '}
              {getTimeRangeLabel(
                data.bioPattern.mostActive.start,
                data.bioPattern.mostActive.end
              )}
            </Text>
          </View>
        )}

        {/* 활동량 히트맵 */}
        {data?.heatmapImageUrl && (
          <View style={styles.heatmapBox}>
            <Text style={styles.heatmapTitle}>활동량 히트맵</Text>
            <Image
              source={{ uri: data.heatmapImageUrl }}
              style={styles.heatmapImage}
            />
          </View>
        )}

        {/* 활동량 그래프 */}
        <View style={styles.chartBox}>
          <Text style={styles.chartTitle}>활동량 그래프</Text>
          <View style={styles.tabContainer}>
            {['hourly', 'daily'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.tabButton,
                  chartType === type && styles.activeTabButton,
                ]}
                onPress={() => setChartType(type as 'hourly' | 'daily')}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    chartType === type && styles.activeTabButtonText,
                  ]}
                >
                  {type === 'hourly' ? '시간별' : '일별'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <BarChart
            data={{
              labels,
              datasets: [{ data: values }],
            }}
            width={screenWidth - 60}
            height={220}
            fromZero
            yAxisLabel=''
            yAxisSuffix=''
            chartConfig={{
              backgroundGradientFrom: colors.WHITE,
              backgroundGradientTo: colors.WHITE,
              color: () => colors.BLUE_500,
              labelColor: () => colors.GRAY_700,
              barPercentage: values.length > 7 ? 0.5 : 0.7,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.WHITE },
  scrollContainer: { padding: 20, paddingBottom: 100 },
  warningBox: {
    backgroundColor: '#FFE3E3',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  warningTitle: { fontSize: 16, fontWeight: '700', color: colors.RED_500 },
  warningDesc: { fontSize: 14, color: colors.RED_500 },
  safeBox: {
    backgroundColor: colors.GRAY_100,
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  safeText: { color: colors.GRAY_600 },
  videoContainer: {
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  video: { width: '100%', height: '100%' },
  patternBox: { marginBottom: 20 },
  patternTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  subPattern: { color: colors.GRAY_500, marginTop: 4 },
  heatmapBox: { marginBottom: 20 },
  heatmapTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  heatmapImage: { width: '100%', height: 200, borderRadius: 10 },
  chartBox: { marginBottom: 40, alignItems: 'center' },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  tabContainer: { flexDirection: 'row', marginBottom: 12 },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    alignItems: 'center',
  },
  activeTabButton: { borderBottomColor: colors.BLUE_500 },
  tabButtonText: { color: colors.GRAY_500, fontWeight: '500' },
  activeTabButtonText: { color: colors.BLUE_500, fontWeight: '700' },
});
