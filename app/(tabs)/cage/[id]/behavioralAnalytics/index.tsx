import { Stack } from 'expo-router';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { useState } from 'react';
import { BarChart } from 'react-native-chart-kit';
import { colors } from '@/constants';
import HealthCalendar from '../manage/components/HealthCalendar';
import { useVideoPlayer, VideoView } from 'expo-video';

const screenWidth = Dimensions.get('window').width;

export default function BehavioralAnalyticsScreen() {
  const [chartType, setChartType] = useState<'hourly' | 'daily'>('hourly');
  const abnormalBehavior = true; // 예시 (API 데이터 연동 시 변경)
  const highlightVideoExists = true; // 예시 (API 데이터 연동 시 변경)

  const videoSource =
    'https://direp.s3.amazonaws.com/test/sample.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARSJVEUEYSJWQNXUI%2F20250413%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20250413T071913Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=f508eb9707abb423b749c382d99cad497976309bf932bdc628d64042b8d75b98';
  const player = useVideoPlayer(
    videoSource,
    (player: { loop: boolean; play: () => void }) => {
      player.loop = true;
      player.play();
    }
  );

  const hourlyData = {
    labels: ['0', '3', '6', '9', '12', '15', '18', '21', '24'],
    datasets: [{ data: [20, 45, 28, 80, 99, 43, 54, 33, 22] }],
  };

  const dailyData = {
    labels: ['2.9', '2.13', '2.17', '오늘'],
    datasets: [{ data: [120, 95, 150, 80] }],
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Stack.Screen
          options={{ title: '행동분석', headerTitleAlign: 'center' }}
        />
        <HealthCalendar />
        {/* 이상행동 경고 */}
        {abnormalBehavior ? (
          <View style={styles.warningBox}>
            <Text style={styles.warningTitle}>이상 행동: 스트레스 주의</Text>
            <Text style={styles.warningDesc}>
              크레스티드 게코의 파이어업 상태 30분간 지속
            </Text>
          </View>
        ) : (
          <View style={styles.safeBox}>
            <Text style={styles.safeText}>이상행동 없음</Text>
          </View>
        )}

        {/* 하이라이트 영상 */}
        {highlightVideoExists && (
          <View style={styles.patternBox}>
            <Text style={styles.heatmapTitle}>활동량 히트맵</Text>
            <View style={styles.videoContainer}>
              <VideoView
                style={styles.video}
                player={player}
                allowsFullscreen
                allowsPictureInPicture
              />
            </View>
          </View>
        )}

        {/* 생체 패턴 */}
        <View style={styles.patternBox}>
          <Text style={styles.patternTitle}>생체 패턴</Text>
          <Text>기상: 오전 8시 ~ 오후 2시</Text>
          <Text>수면: 오후 2시 ~ 오전 8시</Text>
          <Text style={styles.subPattern}>
            *오전 10시 ~ 오전 11시 (전체 활동량의 60%)
          </Text>
        </View>

        {/* 활동량 히트맵 */}
        <View style={styles.heatmapBox}>
          <Text style={styles.heatmapTitle}>활동량 히트맵</Text>
          <Image
            source={{ uri: 'https://via.placeholder.com/400x200' }}
            style={styles.heatmapImage}
          />
        </View>

        {/* 활동량 그래프 */}
        <View style={styles.chartBox}>
          <Text style={styles.chartTitle}>활동량 그래프</Text>

          {/* Tab Button */}
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

          {/* Chart */}
          <BarChart
            data={chartType === 'hourly' ? hourlyData : dailyData}
            width={screenWidth - 40}
            height={220}
            fromZero
            yAxisLabel=''
            yAxisSuffix=''
            chartConfig={{
              backgroundGradientFrom: colors.WHITE,
              backgroundGradientTo: colors.WHITE,
              color: () => colors.BLUE_500,
              labelColor: () => colors.GRAY_700,
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
  calendar: { marginBottom: 20 },
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
  videoBox: {
    height: 200,
    backgroundColor: colors.GRAY_100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  videoText: { color: colors.GRAY_600 },
  videoContainer: {
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: '100%',
  },
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
  avgText: {
    position: 'absolute',
    top: 20,
    right: 10,
    fontSize: 12,
    color: colors.BLUE_500,
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    alignItems: 'center',
  },

  activeTabButton: {
    borderBottomColor: colors.BLUE_500,
  },

  tabButtonText: {
    color: colors.GRAY_500,
    fontWeight: '500',
  },

  activeTabButtonText: {
    color: colors.BLUE_500,
    fontWeight: '700',
  },
});
