import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '@/components/PrimaryButton';
import { ScrollView } from 'react-native-gesture-handler';
import { usePostHealthRecord } from '@/hooks/usePostHealthRecord';
import { useLocalSearchParams } from 'expo-router';

interface HealthModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const sheddingOptions = [
  '해당없음',
  '탈피 예정',
  '탈피 중',
  '탈피 완료',
  '탈피 실패',
];

export default function HealthModal({ isVisible, onClose }: HealthModalProps) {
  const { id } = useLocalSearchParams();
  const postHealth = usePostHealthRecord(Number(id));
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      weight: '',
      shedding: '해당없음',
      memo: '',
      photo: '',
    },
  });

  const photo = watch('photo');
  const shedding = watch('shedding');
  const [isSelectOpen, setSelectOpen] = useState(false);

  const onSubmit = (data: any) => {
    postHealth.mutate(data, {
      onSuccess: () => {
        console.log('✅ 성공적으로 저장됨');
        onClose();
      },
      onError: (err) => {
        console.error('❌ 저장 실패:', err);
      },
    });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setValue('photo', result.assets[0].uri);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modalWrapper}
      backdropOpacity={0.5}
    >
      <View style={styles.modalContent}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{ paddingBottom: 100, gap: 20 }}>
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose}>
                <Ionicons
                  name='close-outline'
                  size={25}
                  style={styles.headerIcon}
                />
              </TouchableOpacity>
              <Text style={styles.headerText}>관리 기록</Text>
              <View />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>몸무게</Text>
              <Controller
                control={control}
                name='weight'
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder='0.00'
                    keyboardType='numeric'
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <Text style={styles.unit}>g</Text>
            </View>

            <View>
              <Text style={styles.label}>탈피</Text>
              <TouchableOpacity
                style={styles.selectBox}
                onPress={() => setSelectOpen(!isSelectOpen)}
              >
                <Text style={styles.selectBoxText}>{shedding}</Text>
              </TouchableOpacity>

              {isSelectOpen && (
                <View style={styles.dropdown}>
                  {sheddingOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setValue('shedding', option);
                        setSelectOpen(false);
                      }}
                    >
                      <Text style={styles.dropdownText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.memoContainer}>
              <Text style={styles.label}>메모</Text>
              <Controller
                control={control}
                name='memo'
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    style={styles.memoInput}
                    placeholder='반려동물의 건강에 대한 메모를 남겨보세요.'
                    multiline
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={styles.photoContainer}>
              <Text style={styles.label}>사진</Text>
              <TouchableOpacity
                style={styles.photoPicker}
                onPress={pickImage}
              >
                {photo ? (
                  <Image
                    source={{ uri: photo }}
                    style={styles.photoPicker}
                  />
                ) : (
                  <Text style={styles.photoText}>+</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View
            style={{ width: '100%', alignItems: 'center', marginBottom: 20 }}
          >
            <CustomButton
              title='저장'
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: 800,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerIcon: {
    opacity: 0.5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_300,
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.BLACK,
  },
  input: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    color: colors.BLACK,
  },
  unit: {
    fontSize: 16,
    color: colors.BLACK,
    marginLeft: 8,
  },
  selectBox: {
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    borderRadius: 10,
  },
  selectBoxText: {
    fontSize: 16,
    color: colors.BLACK,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    borderRadius: 10,
    marginTop: 8,
  },
  dropdownItem: {
    padding: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: colors.GRAY_700,
  },
  memoContainer: {
    marginTop: 20,
  },
  memoInput: {
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    borderRadius: 10,
    padding: 10,
    minHeight: 80,
    marginTop: 10,
  },
  photoContainer: {
    marginTop: 20,
  },
  photoPicker: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoText: {
    fontSize: 24,
    color: colors.GRAY_500,
  },
});
