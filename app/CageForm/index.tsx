import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import PrimaryButton from '@/components/PrimaryButton';
import DatePicker from '@/components/DatePicker';
import { usePostCage } from '@/hooks/usePostCage';
import dayjs from 'dayjs';

interface FormData {
  // 폼 데이터 타입 정의
  name: string;
  gender: string;
  birthdate: string;
  species: string;
}

const cageForm = () => {
  const router = useRouter();

  const [step, setStep] = useState(1);

  //기본값 (종, 이름, 성별, 생년월일)
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: { species: '', name: '', gender: '', birthdate: '' },
  });

  // 오류 메시지 상태 관리
  const [error, setError] = useState<string | null>(null);

  // 종 버튼 클릭 확인
  const [selectedSpecies, setSelectedSepecies] = useState<
    null | '크레스티드 게코' | '레오파드 게코'
  >(null);

  // 성별 버튼 클릭 확인
  const [selectedGender, setSelectedGender] = useState<
    null | '남아' | '여아' | '미구분'
  >(null);

  // 날짜 선택 관리
  const formattedDate = dayjs().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(formattedDate);

  // 이름 실시간으로 watch
  const nameValue = watch('name');

  useEffect(() => {
    // 이름 필드 값이 변경될 때마다 유효성 검사
    const validationMessage = isNameValid(nameValue);
    setError(validationMessage);
  }, [nameValue]); // nameValue가 변경될 때마다 실행

  const isNameValid = (name: string) => {
    // 이름 유효성 검사 함수
    //1. 비어있을 때
    if (name.trim().length === 0) {
      return '이름을 입력하세요.';
    }

    //2. 한글이나 영문이 아닐 때
    const isValidCharacter = /^[a-zA-Zㄱ-ㅎ가-힣]+$/.test(name);
    if (!isValidCharacter) {
      return '한글 또는 영문만 입력할 수 있어요.';
    }

    //3. 자음 혹은 모음만 입력됐을 때
    const hasOnlyConsonants = /^[ㄱ-ㅎ]+$/.test(name); // 자음만
    const hasOnlyVowels = /^[ㅏ-ㅣ]+$/.test(name); // 모음만
    if (hasOnlyConsonants || hasOnlyVowels) {
      return '자음이나 모음만 입력할 순 없어요.';
    }

    return null;
  };

  const handleNext = () => {
    // 다음버튼 함수
    setStep((prevStep) => prevStep + 1);
  };

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate); // 날짜 변경될 때마다 상태 업데이트
    setValue('birthdate', newDate); // 리액트 훅 폼 필드에 반영
  };

  const progressBarWidth = (currentStep: number) => {
    //진행바 범위 정하는 함수 (단계 늘어날 시 추가)
    if (currentStep === 1) {
      return '25%'; // 1단계: 파랑 1/4
    } else if (currentStep === 2) {
      return '50%'; // 2단계: 파랑 2/4
    } else if (currentStep === 3) {
      return '75%'; // 3단계: 파랑 3/4
    } else {
      return '100%'; // 3단계: 파랑 4/4
    }
  };
  const cageMutation = usePostCage();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    //데이터 전송(수정하기)
    console.log('제출 데이터:', data);

    cageMutation.mutate(data, {
      onSuccess: (res) => {
        router.replace('/cage');
      },
      onError: (error) => {
        console.error('에러 발생:', error);
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressBar}>
        <View style={[styles.fillBar, { width: progressBarWidth(step) }]} />
      </View>

      {step == 1 && (
        <View style={styles.container}>
          <Text style={styles.mainText}>
            어떤 도마뱀을{'\n'}추가하시겠습니까?
          </Text>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWithDescription}>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedSpecies === '크레스티드 게코' &&
                    styles.selectedButton,
                ]}
                onPress={() => {
                  setSelectedSepecies('크레스티드 게코');
                  setValue('species', '크레스티드 게코');
                }}
              >
                <Image
                  source={
                    selectedSpecies === '크레스티드 게코'
                      ? require('@/assets/images/crested.png')
                      : require('@/assets/images/crested_bw.png')
                  }
                  style={styles.speciesImage}
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.genderText,
                  selectedSpecies === '크레스티드 게코' && styles.selectedText,
                ]}
              >
                크레스티드 게코
              </Text>
            </View>
            <View style={styles.buttonWithDescription}>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedSpecies === '레오파드 게코' && styles.selectedButton,
                ]}
                onPress={() => {
                  setSelectedSepecies('레오파드 게코');
                  setValue('species', '레오파드 게코');
                }}
              >
                <Image
                  source={
                    selectedSpecies === '레오파드 게코'
                      ? require('@/assets/images/leopard.png')
                      : require('@/assets/images/leopard_bw.png')
                  }
                  style={styles.speciesImage}
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.genderText,
                  selectedSpecies === '레오파드 게코' && styles.selectedText,
                ]}
              >
                레오파드 게코
              </Text>
            </View>
          </View>
          <PrimaryButton
            title='다음'
            onPress={handleNext}
            isDisabled={selectedSpecies === null}
          />
        </View>
      )}
      {step == 2 && (
        <View style={styles.container}>
          <Text style={styles.mainText}>
            추가하실 도마뱀의{'\n'}이름은 무엇인가요?
          </Text>
          <Controller
            control={control}
            name='name'
            render={({ field }) => (
              <>
                <TextInput
                  style={styles.textInput}
                  placeholder='이름 입력'
                  value={field.value}
                  onChangeText={field.onChange}
                />
                <View
                  style={[styles.separator, error && styles.separatorError]}
                />
                {error && <Text style={styles.errorText}>{error}</Text>}
              </>
            )}
          />
          <PrimaryButton
            title='다음'
            onPress={handleNext}
            isDisabled={error !== null}
          />
        </View>
      )}

      {step === 3 && (
        <View style={styles.container}>
          <Text style={styles.mainText}>
            추가하실 도마뱀의{'\n'}성별은 무엇인가요?
          </Text>

          <View style={styles.buttonContainer}>
            <View style={styles.buttonWithDescription}>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedGender === '남아' && styles.selectedButton,
                ]}
                onPress={() => {
                  setSelectedGender('남아');
                  setValue('gender', '남아');
                }}
              >
                <Image
                  source={
                    selectedGender === '남아'
                      ? require('@/assets/images/male_symbol.png')
                      : require('@/assets/images/male_symbol_white.png')
                  }
                  style={styles.image}
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.genderText,
                  selectedGender === '남아' && styles.selectedText,
                ]}
              >
                남아
              </Text>
            </View>
            <View style={styles.buttonWithDescription}>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedGender === '여아' && styles.selectedButton,
                ]}
                onPress={() => {
                  setSelectedGender('여아');
                  setValue('gender', '여아');
                }}
              >
                <Image
                  source={
                    selectedGender === '여아'
                      ? require('@/assets/images/female_symbol.png')
                      : require('@/assets/images/female_symbol_white.png')
                  }
                  style={styles.image}
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.genderText,
                  selectedGender === '여아' && styles.selectedText,
                ]}
              >
                여아
              </Text>
            </View>
          </View>
          <View style={styles.unknownGender}>
            <Text style={styles.unknownText}>
              혹시 아직 성별을 구분할 수 없나요?
            </Text>
            <View style={styles.selectUnknownGender}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedGender('미구분');
                  setValue('gender', '미구분');
                }}
              >
                <Ionicons
                  name='checkmark-circle'
                  size={16}
                  color={
                    selectedGender === '미구분' ? colors.mainBlue : colors.gray
                  }
                  style={{ opacity: selectedGender === '미구분' ? 1 : 0.5 }}
                ></Ionicons>
              </TouchableOpacity>
              <Text style={styles.unknownText}>미구분</Text>
            </View>
          </View>
          <PrimaryButton
            title='다음'
            onPress={handleNext}
            isDisabled={selectedGender === null}
          />
        </View>
      )}

      {step === 4 && (
        <View style={styles.container}>
          <Text style={styles.mainText}> {nameValue}의 생일은?</Text>
          <Controller
            control={control}
            name='birthdate'
            render={() => (
              <>
                <View style={{ marginTop: 100 }}>
                  <DatePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </View>
              </>
            )}
          />

          <PrimaryButton
            title='생성'
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  progressBar: {
    marginTop: 60,
    width: '20%',
    height: 3,
    backgroundColor: '#ccc',
    position: 'relative',
  },
  fillBar: {
    height: '100%',
    backgroundColor: colors.mainBlue,
  },

  mainText: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 50,
    marginHorizontal: 20,
  },
  textInput: {
    marginTop: 70,
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
  separator: {
    alignItems: 'center',
    height: 1,
    backgroundColor: 'black',
    opacity: 0.5,
    marginVertical: 10,
    width: 350,
  },
  separatorError: {
    alignItems: 'center',
    height: 1,
    backgroundColor: 'red',
    opacity: 0.5,
    marginVertical: 10,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 15,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
    height: 160,
    backgroundColor: colors.light_gray,
    borderRadius: 10,
  },
  selectedButton: {
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: colors.mainBlue,
  },
  buttonWithDescription: {
    flexDirection: 'column',
    alignItems: 'center',
    top: 10,
  },
  genderText: {
    color: colors.gray,
    opacity: 0.5,
    fontSize: 16,
    marginTop: 10,
  },
  selectedText: {
    color: colors.gray,
    opacity: 1,
    fontSize: 16,
  },
  speciesImage: {
    width: 120,
    height: 150,
    resizeMode: 'contain',
  },
  image: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
  },
  unknownText: {
    color: colors.gray,
    opacity: 0.5,
    fontSize: 14,
  },
  unknownGender: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 40,
  },
  selectUnknownGender: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
});

export default cageForm;
