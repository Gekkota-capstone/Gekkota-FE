import { Tabs, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.BLACK,
        headerShown: false, // ✅ 여기서 헤더 활성화
        headerTintColor: colors.BLACK,
        headerStyle: {
          backgroundColor: colors.WHITE,
        },
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: '700',
        },
        headerTitleAlign: 'left',
        headerTitleContainerStyle: {
          paddingLeft: 8, // ← 여기서 조절
        },
      }}
    >
      <Tabs.Screen
        name='cage'
        options={{
          title: '홈',
          headerRight: () => (
            <Link
              href='/cage'
              style={{ marginRight: 15 }}
            >
              <Ionicons
                name='notifications-outline'
                size={24}
                color={colors.BLACK}
              />
            </Link>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons
              name='home-outline'
              size={26}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name='mypage'
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
              마이페이지
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons
              name='person-circle-outline'
              size={26}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
