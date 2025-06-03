import { Stack } from 'expo-router';
import { colors } from '@/constants';

export default function Layout() {
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
          title: '케이지 생성',
          headerShown: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </Stack>
  );
}
