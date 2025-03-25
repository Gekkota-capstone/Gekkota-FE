import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import 'react-native-reanimated';
import queryClient from '@/api/queryClient';

SplashScreen.preventAutoHideAsync();
async function enableMocking() {
  if (!__DEV__) return;

  await import('../msw.polyfills');
  const { server } = await import('../mock/server');

  server.listen({ onUnhandledRequest: 'bypass' });
  console.log('msw 시작');
}
enableMocking();
export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name='(tabs)'
          options={{ headerShown: false }}
        />
        <Stack.Screen name='+not-found' />
      </Stack>
    </QueryClientProvider>
  );
}
