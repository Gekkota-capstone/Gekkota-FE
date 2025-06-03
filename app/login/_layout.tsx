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
        name='signIn'
        options={{
          title: '로그인',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='signUp'
        options={{
          title: '로그인',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
