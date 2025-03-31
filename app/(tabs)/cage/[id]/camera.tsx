import { Stack } from 'expo-router';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useVideoPlayer, VideoView } from 'expo-video';
import { LineChart } from 'react-native-chart-kit';
import { SetStateAction, useState } from 'react';
import { colors } from '@/constants';

const screenWidth = Dimensions.get('window').width;
const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: 'white',
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `${colors.BLACK}`,
  strokeWidth: 3,
  barPercentage: 11,
  useShadowColorFromDataset: true,
};

export default function CameraScreen() {
  const getKoreanDate = () => {
    const now = new Date();
    const koreanDate = now.toLocaleDateString('sv-SE', {
      timeZone: 'Asia/Seoul',
    });
    return koreanDate;
  };

  const data = {
    labels: ['0', '3', '6', '9', '12', '15', '18', '21', '24'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 54],
      },
    ],
  };
  const videoSource =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  const [selectedDate, setSelectedDate] = useState(getKoreanDate());
  const [selectedAction, setSelectedAction] = useState<'탈피' | '활동'>('활동');
  const player = useVideoPlayer(
    videoSource,
    (player: { loop: boolean; play: () => void }) => {
      player.loop = true;
      player.play();
    }
  );

  // 실제로는 선택한 날짜와 행동에 따라 동적으로 변경됩니다.
  const videoUri = {
    탈피: 'https://example.com/molting-video.mp4',
    활동: 'https://example.com/activity-video.mp4',
  }[selectedAction];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: '카메라', headerTitleAlign: 'center' }} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* 비디오 영역 */}
        <View style={styles.videoContainer}>
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
        </View>

        {/* 날짜 선택 영역 */}
        <View style={styles.datePickerContainer}>
          <Calendar
            current={selectedDate}
            onDayPress={(day: { dateString: SetStateAction<string> }) =>
              setSelectedDate(day.dateString)
            }
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: colors.ORANGE_600,
              },
            }}
          />
        </View>

        {/* 행동 선택 영역 */}
        <View style={styles.actionContainer}>
          {['탈피', '활동'].map((action) => (
            <TouchableOpacity
              key={action}
              style={[
                styles.actionItem,
                action === selectedAction && styles.selectedAction,
              ]}
              onPress={() => setSelectedAction(action as '탈피' | '활동')}
            >
              <Text style={styles.actionText}>{action}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 그래프 영역 */}
        <View style={styles.graphContainer}>
          <Text style={styles.graphTitle}>시간별 활동량</Text>
          <LineChart
            data={data}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  videoContainer: {
    height: 220,
    backgroundColor: colors.GRAY_100,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  actionItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.GRAY_100,
    borderRadius: 10,
  },
  selectedAction: {
    backgroundColor: colors.GRAY_300,
  },
  actionText: {
    color: colors.BLACK,
    fontWeight: '600',
  },
  graphContainer: {
    marginTop: 20,
    marginBottom: 50,
    alignItems: 'center',
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  chartStyle: {
    borderRadius: 12,
  },
});
