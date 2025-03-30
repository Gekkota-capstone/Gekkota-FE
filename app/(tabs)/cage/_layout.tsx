import { colors } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

export default function CageLayout() {
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
        name='[id]'
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
          title: '',
        }}
      />
    </Stack>
  );
}
