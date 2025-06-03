import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useGetPetInfo } from '@/hooks/useGetPetInfo';
import { usePetContext } from '@/contexts/PetContext';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants';
import PrimaryButton from '@/components/PrimaryButton';
import DatePicker from '@/components/DatePicker';
import ModalSelector from '@/components/Modal';
import DeleteModal from '@/components/DeleteModal';
import { useUpdatePetInfo } from '@/hooks/useUpdatePetInfo';
import { useDeletePet } from '@/hooks/useDeletePet';

export default function SettingScreen() {
  const { petId } = usePetContext(); // Context에서 petId 가져오기
  const { data, error, isLoading } = petId
    ? useGetPetInfo(petId)
    : { data: null, error: null, isLoading: false };
  const { mutate: deleteMutate } = useDeletePet(petId as string, () =>
    router.push('/cage')
  );

  const [name, setName] = useState(data?.name || '');
  const [gender, setGender] = useState(data?.gender || '');
  const [species, setSpecies] = useState(data?.species || '');
  const [birthdate, setBirthdate] = useState(data?.birthdate || '');
  const [isGenderModalVisible, setGenderModalVisible] = useState(false);
  const [isSpeciesModalVisible, setSpeciesModalVisible] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [date, setDate] = useState('');
  const { mutate } = useUpdatePetInfo();

  const handleSelectGender = (value: string) => {
    setGender(value);
    toggleGenderModal();
  };

  const handleSelectSpecies = (value: string) => {
    setSpecies(value);
    toggleSpeciesModal();
  };

  const toggleGenderModal = () => setGenderModalVisible(!isGenderModalVisible);
  const toggleSpeciesModal = () =>
    setSpeciesModalVisible(!isSpeciesModalVisible);

  const genderOptions = [
    { key: 'male', label: '남아' },
    { key: 'female', label: '여아' },
    { key: 'unknown', label: '미구분' },
  ];

  const speciesOptions = [
    { key: '크레스티드 게코', label: '크레스티드 게코' },
    { key: '레오파드 게코', label: '레오파드 게코' },
  ];

  useEffect(() => {
    if (data) {
      setName(data.name);
      setGender(data.gender);
      setSpecies(data.species);
      setBirthdate(data.birthdate);
    }
  }, [data]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading pet information</Text>;
  }

  if (!data) {
    return <Text>No pet information found</Text>;
  }

  const handleUpdate = () => {
    if (!petId) {
      console.error('ID가 없습니다.');
      return;
    }
    mutate({
      petId: petId as string,
      updatedData: { name, species, gender, birthdate },
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: '정보 수정', headerTitleAlign: 'center' }}
      />

      <Text style={styles.title}>이름</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        editable={true}
      />
      <View style={styles.separator} />

      <Text style={styles.title}>성별</Text>
      <View style={styles.select}>
        <TextInput
          style={styles.input}
          value={gender}
          onPress={toggleGenderModal}
          editable={false}
        />
        <Ionicons
          style={[styles.ionicons, { marginTop: 20 }]}
          name='chevron-down-outline'
          size={15}
        />
      </View>
      <ModalSelector
        isVisible={isGenderModalVisible}
        onClose={toggleGenderModal}
        onSelect={handleSelectGender}
        data={genderOptions}
        selectedOption={gender}
        title='성별 선택'
      />
      <View style={styles.separator} />

      <Text style={styles.title}>종</Text>
      <View style={styles.select}>
        <TextInput
          style={styles.input}
          value={species}
          editable={false}
          onPress={toggleSpeciesModal}
        />
        <Ionicons
          style={[styles.ionicons, { marginTop: 20 }]}
          name='chevron-down-outline'
          size={15}
        />
      </View>
      <ModalSelector
        isVisible={isSpeciesModalVisible}
        onClose={toggleSpeciesModal}
        onSelect={handleSelectSpecies}
        data={speciesOptions}
        selectedOption={species}
        title='종 선택'
      />
      <View style={styles.separator} />

      <Text style={styles.title}>생년월일</Text>
      <DatePicker
        style={{ alignItems: 'flex-start', paddingTop: 17, paddingLeft: 20 }}
        textStyle={{ color: 'black', opacity: 1 }}
        value={birthdate}
        onChange={setBirthdate}
      ></DatePicker>

      <TouchableOpacity
        style={styles.delete}
        onPress={() => {
          setShowDeleteModal(true);
        }}
      >
        <Ionicons
          style={styles.ionicons}
          name='close-circle-outline'
          size={16}
        />
        <Text style={styles.deleteText}>반려동물 정보 지우기</Text>
      </TouchableOpacity>
      <DeleteModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={deleteMutate}
      />

      <View style={{ position: 'absolute', bottom: 30, alignItems: 'center' }}>
        <PrimaryButton
          title='수정'
          onPress={() => handleUpdate()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  separator: {
    alignItems: 'center',
    height: 1,
    backgroundColor: '#ccc',
    opacity: 0.5,
    marginVertical: 10,
    marginBottom: 30,
    width: 350,
  },
  title: {
    alignSelf: 'flex-start',
    marginLeft: 30,
    fontSize: 13,
  },
  input: {
    alignSelf: 'flex-start',
    marginLeft: 30,
    fontSize: 18,
    fontWeight: 'semibold',
    marginTop: 20,
    height: 20,
    width: '85%',
  },
  overlay: {
    justifyContent: 'flex-end',
  },
  modalSelector: {
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
  },
  select: {
    flexDirection: 'row',
    marginRight: 30,
  },
  ionicons: {
    opacity: 0.5,
    color: colors.gray,
  },
  delete: {
    marginTop: 150,
    flexDirection: 'row',
  },
  deleteText: {
    marginLeft: 5,
    color: colors.gray,
    opacity: 0.5,
  },
});
