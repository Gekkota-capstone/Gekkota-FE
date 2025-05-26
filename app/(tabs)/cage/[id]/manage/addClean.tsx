import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import PrimaryButton from '@/components/PrimaryButton';
import { Controller, useForm } from 'react-hook-form';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants';
import { ScrollView } from 'react-native-gesture-handler';
import { router, useLocalSearchParams } from 'expo-router';
import { usePostCleanRecord } from '@/hooks/usePostCleanRecord';
import { usePetContext } from '@/contexts/PetContext';

interface ModalComponentProps {
  isVisible: boolean;
  onClose: () => void;
  selectedDate: string;
}
export default function CleanModal({
  isVisible,
  onClose,
  selectedDate,
}: ModalComponentProps) {
  const { id } = useLocalSearchParams();
  const petId = id as string;
  const postClean = usePostCleanRecord(id as string);
  const { cleanCycleData, setCleanCycleData } = usePetContext();

  const { control, handleSubmit, watch } = useForm<{
    date: string;
    memo: string;
  }>({
    defaultValues: {
      memo: '',
    },
  });

  const onSubmit = (data: any) => {
    postClean.mutate(
      { ...data, date: selectedDate },
      {
        onSuccess: () => {
          setCleanCycleData(petId, {
            recentDate: selectedDate,
          });

          console.log('✅ 성공적으로 저장됨');
          onClose();
        },
        onError: (err) => {
          console.error('❌ 저장 실패:', err);
        },
      }
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modalWrapper}
      animationIn='slideInUp'
      animationOut='slideOutDown'
      backdropOpacity={0.5}
    >
      <View style={styles.modalContent}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            {/* 모달 헤더 */}
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose}>
                <Ionicons
                  name='close-outline'
                  size={25}
                  style={styles.headerIcon}
                ></Ionicons>
              </TouchableOpacity>

              <Text style={styles.headerText}>관리 기록</Text>
            </View>

            {/* 타이틀 */}
            <View style={styles.titleContainer}>
              <Image
                source={require('@/assets/images/manage/cleaning.png')}
                style={styles.titleImage}
              />
              <Text style={styles.titleText}>청소</Text>
            </View>

            {/* 날짜 */}
            <Text style={styles.labelText}>날짜</Text>
            <TouchableOpacity style={styles.lineContainer}>
              <Text style={styles.dateText}>{selectedDate}</Text>
            </TouchableOpacity>

            {/* 메모 (조건부 렌더링) */}
            <Controller
              control={control}
              name='memo'
              render={({ field: { value, onChange } }) => (
                <>
                  <Text style={styles.labelText}>메모</Text>
                  <TouchableOpacity style={styles.lineContainer}>
                    <TextInput
                      style={styles.memoInput}
                      placeholder='청소 기록'
                      value={value}
                      multiline={true}
                      onChangeText={onChange}
                    />
                  </TouchableOpacity>
                </>
              )}
            />
            {/* 삭제하기 */}
            <TouchableOpacity style={styles.delete}>
              <Ionicons
                name='trash-bin-outline'
                size={15}
              ></Ionicons>
              <Text style={styles.deleteText}>삭제하기</Text>
            </TouchableOpacity>
          </ScrollView>

          <PrimaryButton
            title='저장'
            onPress={handleSubmit(onSubmit)}
          />
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
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  headerIcon: {
    opacity: 0.5,
  },
  headerText: {
    flex: 1,
    marginRight: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 30,
  },
  titleImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 14,
    fontWeight: 'bold',
    left: 0,
    marginTop: 20,
    marginBottom: 10,
  },
  lineContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  dateText: {
    color: colors.mainBlue,
    fontSize: 18,
  },
  delete: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    opacity: 0.5,
  },
  deleteText: {
    fontSize: 13,
    color: colors.gray,
    marginLeft: 3,
  },
  memoInput: {
    fontSize: 16,
    height: 100,
    color: colors.gray,
    textAlignVertical: 'top',
  },
});
