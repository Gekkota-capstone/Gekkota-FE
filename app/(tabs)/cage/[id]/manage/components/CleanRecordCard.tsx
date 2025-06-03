import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants';
import { Pressable } from 'react-native-gesture-handler';
interface CleanRecordData {
  date: string;
  memo: string | null;
}

interface CleanRecordCardProps {
  onPress: () => void;
  data: CleanRecordData
}
export default function CleanRecordCard({ onPress, data }: CleanRecordCardProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.title}>청소</Text>
        <Text style={styles.detail}>{data.date}</Text>
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
    backgroundColor: colors.light_gray,
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
