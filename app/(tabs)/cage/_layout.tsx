import { colors } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Platform, Text, TouchableOpacity } from 'react-native';

export default function CageLayout() {
  const { id } = useLocalSearchParams();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          headerShown: true,
          headerTintColor: colors.BLACK,
          headerStyle: {
            backgroundColor: colors.WHITE,
          },
          headerTitleAlign: 'left',
          headerTitle: () => (
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: colors.BLACK,
                width: '100%',
                textAlign: 'left',
              }}
            >
              홈
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name='[id]/index'
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
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push(`/cage/${id}/setting`)}
              style={{ paddingLeft: 4 }}
            >
              <Ionicons
                name='settings'
                size={24}
                color={colors.BLACK}
              />
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          title: '',
        }}
      />
      <Stack.Screen
        name='[id]/camera'
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
          title: '실시간 카메라',
        }}
      />
      <Stack.Screen
        name='[id]/setting'
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
          title: '',
        }}
      />
    </Stack>
  );
}
