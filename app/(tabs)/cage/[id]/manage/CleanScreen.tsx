import { useLocalSearchParams, Stack, router } from 'expo-router';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors } from '@/constants';
import CustomButton from '@/components/PrimaryButton'
import React, { useState } from 'react';
import AlertCycleCard from './components/AlertCycleCard'
import Calender from './components/Calender';
import ModalComponent from '@/app/(tabs)/cage/[id]/manage/addClean'

export default function CleanScreen() {
  const { id } = useLocalSearchParams();
  const [isModalVisible, setModalVisible] = useState(false);
  const [showCycleModal, setShowCycleModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AlertCycleCard
          recentDate="12/2"
          nextDate="12/8"
          dDay={1}
          alertText="7일 간격으로"
          onPressCycle={() => setShowCycleModal(true)}
          onPressAlert={() => setShowAlertModal(true)}
        />
        <Calender />
      </ScrollView>

      <CustomButton
        title='추가하기'
        onPress={openModal}/>
        <ModalComponent isVisible={isModalVisible} onClose={closeModal} />


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: 15
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 50,
    alignItems:'center'
  },
});
