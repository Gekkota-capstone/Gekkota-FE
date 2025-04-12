import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants';
import { Pressable } from 'react-native-gesture-handler';
import { Colors } from '@/constants/colors'

interface HealthRecordCardProps {
  onPress: () => void;
}
export default function HealthRecordCard({ onPress }: HealthRecordCardProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.title}>건강</Text>
        <Text style={styles.detail}>12g, 탈피 실패</Text>
        <Text style={styles.description}>
          잉크 왼쪽 다리에서 네번째 발가락 확인하기, 이번 탈피 이후 계속 물어
          뜯는 것
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light_gray,
    padding: 16,
    borderRadius: 10,
    marginVertical: 12,
    elevation: 2,
  },
  title: { fontWeight: '700', fontSize: 18 },
  detail: { color: colors.GRAY_700, marginVertical: 8 },
  description: { color: colors.GRAY_600, fontSize: 13 },
});
