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
          headerShadowVisible: false,
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
          headerTitleAlign: 'center',
          title: '관리',
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
          headerTitleAlign: 'center',
          title: '정보 추가하기',
        }}
      />
      <Stack.Screen
        name='addClean'
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
          headerTitleAlign: 'center',
          title: '정보 추가하기',
        }}
      />
    </Stack>
  );
}
