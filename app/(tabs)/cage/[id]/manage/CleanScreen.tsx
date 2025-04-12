import { useLocalSearchParams, Stack } from 'expo-router';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { colors } from '@/constants';

export default function CleanScreen() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <Text>청소</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.WHITE, paddingHorizontal: 16 },
  addButton: {
    backgroundColor: colors.BLUE_500,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  addButtonText: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
});
