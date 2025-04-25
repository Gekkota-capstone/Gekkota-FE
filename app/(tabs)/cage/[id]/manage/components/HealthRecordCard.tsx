import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants';
import { Pressable } from 'react-native-gesture-handler';
import { Colors } from '@/constants/colors';

interface HealthRecordData {
  date: string;
  weight: string;
  memo: string;
  photoUri?: string;
  sheddingStatus: null | '탈피예정' | '탈피 중' | '탈피 완료' | '탈피 실패';
}

interface HealthRecordCardProps {
  onPress: () => void;
  data: HealthRecordData;
}

export default function HealthRecordCard({
  onPress,
  data,
}: HealthRecordCardProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.title}>건강 기록</Text>
        <Text style={styles.detail}>
          {data.weight}
          {data.sheddingStatus && `, ${data.sheddingStatus}`}
        </Text>
        <Text
          style={styles.description}
          numberOfLines={2}
        >
          {data.memo || '기록된 메모가 없습니다.'}
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
  title: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 4,
  },
  detail: {
    color: colors.GRAY_700,
    marginBottom: 8,
  },
  description: {
    color: colors.GRAY_600,
    fontSize: 13,
  },
});
