import React, { useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants';
import NotificationCard from '@/components/NotificationCard';
import PetNameDropdown from '@/components/PetNameDropdown';
import { usePetContext } from '@/contexts/PetContext';

export default function NotificationScreen() {
  const { feedCycleData, cleanCycleData, pets } = usePetContext();
  const [selectedPetId, setSelectedPetId] = useState<string | null>('all');
  const [isModalVisible, setModalVisible] = useState(false);
  const [deletedNotificationIds, setDeletedNotificationIds] = useState<string[]>([]);


  const [localNotifications, setLocalNotifications] = useState(() => {

    const validPetIds = pets.map((p) => p.pet_id);

    const feedNotifications = Object.entries(feedCycleData)
    .filter(([petId]) => validPetIds.includes(petId))
    .map(([petId, cycle]) => ({
      id: `feed-${petId}`,
      petId,
      name: pets.find((p) => p.pet_id === petId)?.name ?? petId,
      type: '급여',
      status: cycle.dDay === 'D-day' ? '알림' : '지연',
      dDay: cycle.dDay,
      nextDate: cycle.nextDate,
    }));

    const cleanNotifications = Object.entries(cleanCycleData)
    .filter(([petId]) => validPetIds.includes(petId))
    .map(([petId, cycle]) => ({
      id: `clean-${petId}`,
      petId,
      name: pets.find((p) => p.pet_id === petId)?.name ?? petId,
      type: '청소',
      status: cycle.dDay === 'D-day' ? '알림' : '지연',
      dDay: cycle.dDay,
      nextDate: cycle.nextDate,
    }));

    return [...feedNotifications, ...cleanNotifications];
  });

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSelectPet = (petId: string | null) => {
    setSelectedPetId(petId);
    closeModal();
  };

  const filteredNotifications = selectedPetId === 'all'
    ? localNotifications
    : localNotifications.filter(n => n.petId === selectedPetId);

  const handleClearNotifications = () => {
    if (selectedPetId === 'all') {
      // 전체 삭제
      Alert.alert(
        '전체 알림 삭제',
        '정말 모든 알림을 삭제하시겠습니까?',
        [
          { text: '취소', style: 'cancel' },
          { text: '삭제', style: 'destructive', onPress: () => setLocalNotifications([]) },
        ]
      );
    } else {
      // 특정 펫 알림만 삭제
      Alert.alert(
        '알림 삭제',
        `${pets.find(p => p.pet_id === selectedPetId)?.name ?? '선택한 펫'}의 알림을 모두 삭제하시겠습니까?`,
        [
          { text: '취소', style: 'cancel' },
          {
            text: '삭제', style: 'destructive', onPress: () => {
              setLocalNotifications(prev => prev.filter(n => n.petId !== selectedPetId));
            }
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>알림</Text>
        <TouchableOpacity onPress={openModal}>
          <Ionicons name="chevron-down-outline" size={22} color={colors.GRAY_500} />
        </TouchableOpacity>
      </View>

      {filteredNotifications.length === 0 ? (
        <Text style={styles.loading}>알림이 없습니다.</Text>
      ) : (
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NotificationCard
              name={item.name}
              type={item.type}
              status={item.status}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }} // 버튼 공간 확보
        />
      )}

      <PetNameDropdown
        isVisible={isModalVisible}
        onClose={closeModal}
        onSelect={handleSelectPet}
      />

      {/* 하단 알림 삭제 버튼 */}
      <View style={styles.clearButtonContainer}>
        <TouchableOpacity onPress={handleClearNotifications} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>알림 지우기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { flexDirection: 'row', marginTop: 20 },
  titleText: { marginLeft: 20, marginRight: 10, marginBottom: 10, fontSize: 28, fontWeight: '700' },
  loading: { marginTop: 50, textAlign: 'center', color: '#555' },

  clearButtonContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  clearButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  clearButtonText: {
    color: colors.GRAY_500,
    fontWeight: '700',
    fontSize: 16,
  },
});
