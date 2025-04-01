import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { useGetList } from '@/hooks/useGetList';
import { getList } from '@/api/get';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import CustomButton from '@/components/PrimaryButton';
import DatePicker from '@/components/DatePicker';
import ModalSelector from '@/components/Modal';

export default function SettingScreen() {
  const { id } = useLocalSearchParams();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [species, setSpecies] = useState('');
  const [date, setDate] = useState('');
  const [petId, setPetId] = useState<string | number>('');

  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
  const [isSpeciesModalVisible, setIsSpeciesModalVisible] = useState(false);

  const genderOptions = [
    { key: 'male', label: '남아' },
    { key: 'female', label: '여아' },
    { key: 'unknown', label: '미구분' },
  ];

  const speciesOptions = [
    { key: 'crested', label: '크레스티드 게코' },
    { key: 'leopard', label: '레오파드 게코' }
  ]

  const handleSelectGender = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const handleSelectSpecies = (selectedSpecies: string) => {
    setSpecies(selectedSpecies);
  };
  
  const toggleGenderModal = () => setIsGenderModalVisible(!isGenderModalVisible);
  const toggleSpeciesModal = () => setIsSpeciesModalVisible(!isSpeciesModalVisible);

  useEffect(() => {
    const resolvedPetId = Array.isArray(id) ? id[0] : id;
    setPetId(resolvedPetId);
  }, [id]);

  // 데이터를 가져오는 함수
  useEffect(() => {
    const fetchData = async () => {
      if (!petId) return;

      try {
        const response = await getList();
        const petData = response.list.find((item) => item.id === parseInt(petId as string)); // petId는 string으로 변환하여 비교
        if (petData) {
          setName(petData.name);
          setSpecies(petData.species);
          setGender(petData.gender);
          setDate(petData.date);
        }
      } catch (error) {
        console.error('데이터 로딩 실패', error);
      }
    };
    fetchData();
  }, [petId]);

  // 수정한 데이터를 서버에 반영하는 함수 (수정)
  const handleSave = async () => {
    try {
      const updatedData = {
        name,
        species,
        gender,
        date,
      };
      const response = await fetch(`http://localhost:8081/api/update/${petId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('데이터 수정 실패');
      }

      alert('수정되었습니다.');
    } catch (error) {
      console.error('수정 실패', error);
      alert('수정 실패');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: '정보 수정', headerTitleAlign: 'center' }} />

      <Text style={styles.title}>이름</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <View style={styles.separator} />

      <Text style={styles.title}>성별</Text>
      <View style={styles.select}>
        <TextInput
          style={styles.input}
          value={gender}
          editable={false}
          onPress={toggleGenderModal}
        />
        <Ionicons style={styles.ionicons} name="chevron-down-outline" size={15} />
      </View>
      <ModalSelector
        isVisible={isGenderModalVisible}
        onClose={toggleGenderModal}
        onSelect={handleSelectGender}
        data={genderOptions}
        selectedOption={gender}
        title="성별 선택" 
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
        <Ionicons style={styles.ionicons} name="chevron-down-outline" size={15} />
      </View>
      <ModalSelector
        isVisible={isSpeciesModalVisible}
        onClose={toggleSpeciesModal} 
        onSelect={handleSelectSpecies}
        data={speciesOptions} 
        selectedOption={species}
        title="종 선택" 
      />
      <View style={styles.separator} />

      <Text style={styles.title}>생년월일</Text>
      <DatePicker
        value={date}
        onChange={setDate}
      >
      </DatePicker>

      <View style={{ position: 'absolute', bottom: 30, alignItems: 'center' }}>
        <CustomButton
          title='수정'
          onPress={handleSave}
        />
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
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
    fontSize: 15,
    fontWeight: 'semibold',
    marginTop: 20,
    height: 20,
    width: '85%'
  },
  overlay: {
    justifyContent: 'flex-end',
  },
  modalSelector: {
    alignSelf: 'flex-start',
    justifyContent: 'space-between'
  },
  select: {
    flexDirection: 'row',
    marginRight: 30
  },
  ionicons: {
    marginTop: 20,
    opacity: 0.5,
    color: Colors.gray
  }

});

