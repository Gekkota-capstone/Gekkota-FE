import { colors } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

export default function CageLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 4 }}
            >
              <Ionicons
                name='chevron-back'
                size={24}
                color={colors.BLACK}
              />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: colors.BLACK,
              }}
            >
              관리
            </Text>
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name='addHealth'
        options={{
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 4 }}
            >
              <Ionicons
                name='chevron-back'
                size={24}
                color={colors.BLACK}
              />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: colors.BLACK,
              }}
            >
              정보 추가하기
            </Text>
          ),
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
  );
}
