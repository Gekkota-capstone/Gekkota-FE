import { colors } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { usePetContext } from '@/contexts/PetContext'

export default function CageLayout() {
  const { petId, setPetId } = usePetContext(); //context를 이용하여 전역에서 관리. PetDetailScreen에서 id 

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
          headerRight: () => (
            <TouchableOpacity
              onPress={() => { 
                router.push(`/cage/notifications`) 
              }}
              style={{ paddingLeft: 4 }}
            >
              <Ionicons name="notifications-outline" size={24} color={colors.BLACK} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name='notifications/index'
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 4 }}
            >
              <Ionicons name='chevron-back' size={24} color={colors.BLACK} />
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          title: '',
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
              <Ionicons name='chevron-back' size={24} color={colors.BLACK} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                if (petId) {
                  console.log("💡 id 값:", petId);
                  router.push(`/cage/${petId}/setting`);
                } else {
                  console.error("❌ id 값이 없습니다!");
                }
              }}
              style={{ paddingLeft: 4 }}
            >
              <Ionicons name='settings' size={24} color={colors.BLACK} />
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          title: '',
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
              <Ionicons name='chevron-back' size={24} color={colors.BLACK} />
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          title: '',
        }}
      />
    </Stack>
  );
}
