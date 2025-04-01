import { Stack } from 'expo-router';
import { colors } from '@/constants';

export default function SettingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTintColor: colors.BLACK,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          title: '정보 수정',
          headerShown: false,
        }}
      />
      
    </Stack>
  );
}
