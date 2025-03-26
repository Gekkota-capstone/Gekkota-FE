import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/PrimaryButton';
import PreviousButton from '@/components/PreviousButton';
import DatePicker from '@/components/DatePicker';

interface FormData { // 폼 데이터 타입 정의
    name: string;
    gender: string;
    birthdate: string;
}

const cageForm: React.FC = () => {
    const router = useRouter();

    const [step, setStep] = useState(1);

    //기본값 (이름, 성별, 생년월일)
    const { control, handleSubmit, setValue, watch } = useForm({
        defaultValues: { name: "", gender: "", birthdate: "" },
    });

    // 오류 메시지 상태 관리
    const [error, setError] = useState<string | null>(null);

    // 성별 버튼 클릭 확인
    const [selectedButton, setSelectedButton] = useState<null | "male" | "female" | "unknown">(null);

    // 날짜 선택 관리
    const [selectedDate, setSelectedDate] = useState('2025-03-24');

    // 이름 실시간으로 watch
    const nameValue = watch("name");

    useEffect(() => {
        // 이름 필드 값이 변경될 때마다 유효성 검사
        const validationMessage = isNameValid(nameValue);
        setError(validationMessage)
    }, [nameValue]);  // nameValue가 변경될 때마다 실행

    const isNameValid = (name: string) => { // 이름 유효성 검사 함수
        //1. 비어있을 때
        if (name.trim().length === 0) {
            return "이름을 입력하세요.";
        }

        //2. 한글이나 영문이 아닐 때
        const isValidCharacter = /^[a-zA-Zㄱ-ㅎ가-힣]+$/.test(name);
        if (!isValidCharacter) {
            return "한글 또는 영문만 입력할 수 있어요.";
        }

        //3. 자음 혹은 모음만 입력됐을 때
        const hasOnlyConsonants = /^[ㄱ-ㅎ]+$/.test(name); // 자음만
        const hasOnlyVowels = /^[ㅏ-ㅣ]+$/.test(name);  // 모음만
        if (hasOnlyConsonants || hasOnlyVowels) {
            return "자음이나 모음만 입력할 순 없어요.";
        }

        return null;
    };

    const handleNext = () => { // 다음버튼 함수
        setStep((prevStep) => prevStep + 1);
    };

    const handlePrevious = () => { // 뒤로가기 함수
        if (step > 1) {
            setStep(step - 1);  // 이전 단계로 이동
          } else {
            router.back(); // 첫 번째 단계일 때는 뒤로가기
          }
    };

    const handleDateChange = (newDate: string) => {
        setSelectedDate(newDate); // 날짜 변경될 때마다 상태 업데이트
        setValue("birthdate", newDate); // 리액트 훅 폼 필드에 반영
    };

    const progressBarWidth = (currentStep: number) => { //진행바 범위 정하는 함수 (단계 늘어날 시 추가)
        if (currentStep === 1) {
            return '33%';  // 1단계: 파랑 1/3
        } else if (currentStep === 2) {
            return '66%';  // 2단계: 파랑 2/3
        } else {
            return '100%'; // 3단계: 파랑 3/3
        }
    };

    const onSubmit: SubmitHandler<FormData> = (data) => { console.log("제출데이터: ", data) }; //데이터들 data에 넣어 전달

    return (
        <SafeAreaView style={styles.container} >
            <PreviousButton
                onPrevious={handlePrevious}
            />

            <View style={styles.progressBar}>
                <View style={[styles.fillBar, { width: progressBarWidth(step) }]} />{/* 파랑색으로 채워지는 바 */}
            </View>

            {
                step == 1 && (
                    <View style={styles.container}>
                        <Text style={styles.mainText}>추가하실 도마뱀의{'\n'}이름은 무엇인가요?</Text>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => (<><TextInput style={styles.textInput}
                                placeholder="이름 입력"
                                value={field.value}
                                onChangeText={field.onChange} />
                                <View style={[styles.separator, error && styles.separatorError]} />
                                {error && <Text style={styles.errorText}>{error}</Text>}</>)}
                        />
                        <CustomButton
                            title="다음"
                            onPress={handleNext}
                            isDisabled={error !== null}
                        />
                    </View>
                )
            }

            {
                step === 2 && (
                    <View style={styles.container}>
                        <Text style={styles.mainText}>추가하실 도마뱀의{'\n'}성별은 무엇인가요?</Text>

                        <View style={styles.genderButton}>

                            <TouchableOpacity
                                style={[styles.button, selectedButton === "male" && styles.selectedButton]}
                                onPress={() => {
                                    setSelectedButton("male")
                                    setValue("gender", "male")
                                }}
                            >
                                <Image
                                    source={
                                        selectedButton === "male"
                                            ? require('@/assets/images/male_symbol.png')
                                            : require("@/assets/images/male_symbol_white.png")
                                    }
                                    style={styles.image} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, selectedButton === "female" && styles.selectedButton]}
                                onPress={() => {
                                    setSelectedButton("female")
                                    setValue("gender", "female")
                                }}
                            >
                                <Image
                                    source={
                                        selectedButton === "female"
                                            ? require("@/assets/images/female_symbol.png")
                                            : require("@/assets/images/female_symbol_white.png")
                                    }
                                    style={styles.image} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={[styles.genderText, selectedButton === "male" && styles.selectedText]}>남아</Text>
                            <Text style={[styles.genderText, selectedButton === "female" && styles.selectedText]}>여아</Text>
                        </View>
                        <View style={styles.unknownGender}>
                            <Text style={styles.unknownText}>혹시 아직 성별을 구분할 수 없나요?</Text>
                            <View style={styles.selectUnknownGender}>

                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedButton("unknown")
                                        setValue("gender", "unknown")
                                    }}>
                                    <Ionicons
                                        name="checkmark-circle"
                                        size={16}
                                        color={selectedButton === "unknown" ? Colors.mainBlue : Colors.gray}
                                        style={{ opacity: selectedButton === "unknown" ? 1 : 0.5 }}></Ionicons>
                                </TouchableOpacity>
                                <Text style={styles.unknownText} >미구분</Text>
                            </View>
                        </View>
                        <CustomButton
                            title="다음"
                            onPress={handleNext}
                            isDisabled={selectedButton === null}
                        />
                    </View>
                )
            }

            {
                step === 3 && (
                    <View style={styles.container}>
                        <Text style={styles.mainText}> {nameValue}의 생일은?</Text>
                        <Controller
                            control={control}
                            name="birthdate"
                            render={() => (
                                <>
                                    <View style={{ marginTop: 100 }}>
                                        <DatePicker
                                            value={new Date(selectedDate)}
                                            onChange={handleDateChange} />
                                    </View>
                                </>
                            )} />

                        <CustomButton
                            title="생성"
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                )
            }
        </SafeAreaView >
    )
}

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
        backgroundColor: Colors.mainBlue,
    },

    mainText: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: "bold",
        marginTop: 50,
        marginHorizontal: 20
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
        width: 350
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
    genderButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        gap: 15

    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        width: 140,
        height: 160,
        backgroundColor: Colors.light_gray,
        borderRadius: 10,
    },
    selectedButton: {
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: Colors.mainBlue,
    },
    textContainer: {
        flexDirection: 'row',
        gap: 130,
        marginTop: 10
    },
    genderText: {
        color: Colors.gray,
        opacity: 0.5,
        fontSize: 16,
    },
    selectedText: {
        color: Colors.gray,
        opacity: 1,
        fontSize: 16,
    },
    image: {
        width: 80,
        height: 100,
        resizeMode: "contain"
    },
    unknownText: {
        color: Colors.gray,
        opacity: 0.5,
        fontSize: 14,
    },
    unknownGender: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 40
    },
    selectUnknownGender: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5
    },

});

export default cageForm;