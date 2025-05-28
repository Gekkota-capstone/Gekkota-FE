import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import 'react-native-reanimated';
import queryClient from '@/api/queryClient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as DevClient from 'expo-dev-client';
import PetProvider from '@/contexts/PetContext';
// App.tsx 또는 루트 컴포넌트 최상단에
import { LogBox } from 'react-native';
SplashScreen.preventAutoHideAsync();

async function enableMocking() {
  if (!__DEV__) return;

  await import('../msw.polyfills');
  const { server } = await import('../mock/server');

  server.listen({ onUnhandledRequest: 'bypass' });
  console.log('msw 시작');
}

LogBox.ignoreLogs([
  'Warning: Text strings must be rendered within a <Text> component.',
]);
// enableMocking();

DevClient.openMenu();

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
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <PetProvider>
          {/* ✅ 모든 자식 컴포넌트가 PetContext에 접근 가능 */}
          <Stack>
            <Stack.Screen
              name='(tabs)'
              options={{ headerShown: false }}
            />
            <Stack.Screen name='+not-found' />
            <Stack.Screen
              name='cageForm'
              options={{ headerShown: false }}
            />
          </Stack>
        </PetProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
