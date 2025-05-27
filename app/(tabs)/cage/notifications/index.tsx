import React, { useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants';
import NotificationCard from '@/components/NotificationCard';
import PetNameDropdown from '@/components/PetNameDropdown';

import { usePetContext } from '@/contexts/PetContext';  // 컨텍스트 import
import dayjs from 'dayjs';

export default function NotificationScreen() {
  const { feedCycleData, cleanCycleData } = usePetContext();
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // 알림 목록 만들기: feedCycleData와 cleanCycleData 각각을 알림 형태로 변환
  const feedNotifications = Object.entries(feedCycleData).map(([petId, cycle]) => {
    const dDay = cycle.dDay;
    const status = dDay === 'D-Day' ? '알림' : '지연';
    return {
      id: `feed-${petId}`,
      name: petId, // 나중에 pet 이름 매핑 가능
      type: '급여',
      status,
      dDay,
      nextDate: cycle.nextDate,
    };
  });

  const cleanNotifications = Object.entries(cleanCycleData).map(([petId, cycle]) => {
    const dDay = cycle.dDay;
    const status = dDay === 'D-Day' ? '알림' : '지연';
    return {
      id: `clean-${petId}`,
      name: petId,
      type: '청소',
      status,
      dDay,
      nextDate: cycle.nextDate,
    };
  });

  const notifications = [...feedNotifications, ...cleanNotifications];

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>알림</Text>
        <TouchableOpacity onPress={openModal}>
          <Ionicons name="chevron-down-outline" size={22} color={colors.GRAY_500} />
        </TouchableOpacity>
      </View>

      {notifications.length === 0 ? (
        <Text style={styles.loading}>알림이 없습니다.</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NotificationCard
              name={item.name}
              type={item.type}
              status={item.status}
              time={1} //useEffect로 들어올때마다 현재시간이랑 비교해서 계산해넣기
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      )}

      <PetNameDropdown
        isVisible={isModalVisible}
        onClose={closeModal}
        onPress={() => console.log('눌렀다~')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    flexDirection: 'row',
    marginTop: 20,
  },
  titleText: {
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 10,
    fontSize: 28,
    fontWeight: '700',
  },
  loading: {
    marginTop: 50,
    textAlign: 'center',
    color: '#555',
  },
});
