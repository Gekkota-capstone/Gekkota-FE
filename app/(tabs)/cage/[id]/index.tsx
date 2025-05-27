import { colors } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { usePetContext } from '@/contexts/PetContext';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useGetCageState } from '@/hooks/useGetCageState';
import { useEffect } from 'react';

const cageImages = {
  active: require('@/assets/images/hide_pet.png'),
  stealth: require('@/assets/images/default_pet.png'),
};
export default function PetDetailScreen() {
  const { id } = useLocalSearchParams();
  const { setPetId } = usePetContext(); //현재 페이지의 id PetContext에 저장
  const { data } = useGetCageState(id as string);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      setPetId(id as string);
    }
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cageContainer}>
        <Image
          source={cageImages[data?.is_hiding ? 'stealth' : 'active']}
          style={styles.cageImage}
        />
      </View>

      <View style={styles.menuContainer}>
        <Pressable
          style={styles.menuItem}
          onPress={() => {
            router.push(`/cage/${id}/camera`);
            console.log('카메라 클릭');
          }}
        >
          <Text style={styles.menuTitle}>카메라</Text>
          <View style={styles.menuIcon}>
            <Ionicons
              name='videocam'
              size={24}
              color={colors.BLACK}
            />
          </View>
        </Pressable>

        <Pressable
          style={styles.menuItem}
          onPress={() => {
            router.push(`/cage/${id}/behavioralAnalytics`);
            console.log('행동분석 클릭');
          }}
        >
          <Text style={styles.menuTitle}>행동분석</Text>
          <View style={styles.menuIcon}>
            <Feather
              name='activity'
              size={24}
              color='black'
            />
          </View>
        </Pressable>

        <Pressable
          style={styles.menuItem}
          onPress={() => {
            console.log('대화 클릭');
            router.push(`/cage/${id}/chat`);
          }}
        >
          <Text style={styles.menuTitle}>대화</Text>
          <View style={styles.menuIcon}>
            <Ionicons
              name='chatbubble'
              size={24}
              color={colors.BLACK}
            />
          </View>
        </Pressable>

        <Pressable
          style={styles.menuItem}
          onPress={() => {
            console.log('관리 클릭');
            router.push(`/cage/${id}/manage`);
          }}
        >
          <Text style={styles.menuTitle}>관리</Text>
          <View style={styles.menuIcon}>
            <Ionicons
              name='list'
              size={24}
              color={colors.BLACK}
            />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  cageImage: {
    width: '100%',
    height: 230,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  pointContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#F5F7FA',
    marginRight: 10,
  },
  pointIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  pointText: {
    fontSize: 14,
    fontWeight: '500',
  },
  menuContainer: {
    position: 'absolute', // 절대 위치로 설정
    bottom: 0, // 바닥에 붙도록 함
    left: 0,
    right: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#F0F2F5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  menuItem: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    justifyContent: 'space-between',
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  menuIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    boxShadow: `0px 2px 4px ${colors.GRAY_300}`,
    borderWidth: 2, // 테두리 두께
    borderColor: colors.GRAY_300, // 테두리 색상 (원하는 색상으로 변경 가능)
    alignSelf: 'flex-end',
  },
});
