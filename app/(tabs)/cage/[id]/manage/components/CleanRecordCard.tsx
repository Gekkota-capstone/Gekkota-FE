import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants';
import { Pressable } from 'react-native-gesture-handler';

interface HealthRecordCardProps {
  onPress: () => void;
}
export default function HealthRecordCard({ onPress }: HealthRecordCardProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.title}>청소</Text>
        <Text style={styles.detail}>날짜</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.WHITE,
    padding: 16,
    borderRadius: 10,
    marginVertical: 12,
    elevation: 2,
  },
  title: { fontWeight: '700', fontSize: 18 },
  detail: { color: colors.GRAY_700, marginVertical: 8 },
});
