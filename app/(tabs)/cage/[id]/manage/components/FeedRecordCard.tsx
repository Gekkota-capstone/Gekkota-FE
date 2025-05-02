import { View, Text, StyleSheet } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { colors } from '@/constants';

interface FeedRecordData {
  date: string;
  food_type: '사료' | '귀뚜라미' | '밀웜' | '슈퍼밀웜' | '왁스웜' | '누에' | '과일' | '채소';
  food_size: null | '극소' | '소' | '중' | '대' | '특대';
  food_amount: number | null;
  amount_unit: null | '마리' | 'ml' | 'g';
  memo: string | null;
}

interface FeedRecordCardProps {
  onPress: () => void;
  data: FeedRecordData;
}

export default function FeedRecordCard({
  onPress,
  data,
}: FeedRecordCardProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.title}>급여 기록</Text>
        <Text style={styles.detail}>
          {data.food_type}
          {data.food_size && `, ${data.food_size}`}
          {data.food_amount && `, ${data.food_amount}`}
          {data.amount_unit && `${data.amount_unit}`}
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
