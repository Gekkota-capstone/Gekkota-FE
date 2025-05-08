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
          headerTitleAlign: 'center',
          title: 'AI 채팅',
        }}
      />
    </Stack>
  );
}
