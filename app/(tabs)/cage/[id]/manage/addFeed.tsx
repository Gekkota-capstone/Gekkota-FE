import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import CustomButton from '@/components/PrimaryButton'
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from '@/constants/colors'
import { ScrollView } from "react-native-gesture-handler";
import FeedSelector from './components/FeedSelector'
import FeedSizeSelector from "./components/FeedSizeSelector";
import FeedQuantity from "./components/FeedQuantity";
import { FeedKey } from "./constants/feeding";
import { router } from "expo-router";

interface ModalComponentProps {
    isVisible: boolean;
    onClose: () => void;
}

const FeedModal: React.FC<ModalComponentProps> = ({ isVisible, onClose }) => {
    const { control, handleSubmit, watch, setValue, getValues } = useForm<{
        selectedDate: string;
        selectedFeed: string;
        selectedSize: string;
        quantity: number;
        quantityUnit: string | null;
        memo: string
    }>({
        defaultValues: {
            selectedDate: '2024.12.08',
            selectedFeed: 'feed',
            selectedSize: 'XS',
            quantity: 0,
            quantityUnit: 'ml',
            memo: '',
        },
    });

    const [showUnitToggle, setShowUnitToggle] = useState(false);

    const selectedFeed = watch('selectedFeed');
    const selectedDate = watch('selectedDate')
    const quantityUnit = watch('quantityUnit');

    useEffect(() => {
        if (selectedFeed === 'feed') {
            setValue('quantityUnit', 'ml');
            setShowUnitToggle(true);
        } else if (
            ['cricket', 'mealworm', 'superworm', 'waxworm', 'silkworm'].includes(selectedFeed || '')
        ) {
            setValue('quantityUnit', '마리');
            setShowUnitToggle(false);
        } else if (selectedFeed === 'fruit' || selectedFeed === 'vegetable') {
            setValue('quantityUnit', null);
        }
    }, [selectedFeed]);

    const onSubmit = (data: any) => {
        console.log(data);
        router.back();
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            style={styles.modalWrapper}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropOpacity={0.5}
        >
            <View style={styles.modalContent}>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                        {/* 모달 헤더 */}
                        <View style={styles.header}>
                            <TouchableOpacity
                                onPress={onClose}>
                                <Ionicons name="close-outline" size={25} style={styles.headerIcon}></Ionicons>
                            </TouchableOpacity>

                            <Text style={styles.headerText}>급여 기록</Text>
                        </View>

                        {/* 타이틀 */}
                        <View style={styles.titleContainer}>
                            <Image
                                source={require('@/assets/images/feed/feeding.png')}
                                style={styles.titleImage}
                            />
                            <Text style={styles.titleText}>급여</Text>
                        </View>

                        {/* 날짜 */}
                        <Text style={styles.labelText}>날짜</Text>
                        <TouchableOpacity style={styles.lineContainer}>
                            <Text style={styles.dateText}>{selectedDate}</Text>
                        </TouchableOpacity>

                        {/* 먹이 */}
                        <Text style={styles.labelText}>먹이</Text>
                        <Controller
                            control={control}
                            name="selectedFeed"
                            render={({ field: { value, onChange } }) => (
                                <FeedSelector value={value} onChange={onChange} />
                            )}
                        />

                        {/* 먹이 사이즈 (조건부 렌더링) */}
                        {selectedFeed && !['fruit', 'vegetable', 'feed'].includes(selectedFeed) && (
                            <Controller
                                control={control}
                                name="selectedSize"
                                render={({ field: { value, onChange } }) => (
                                    <>
                                        <Text style={styles.labelText}>먹이 사이즈</Text>
                                        <FeedSizeSelector value={value} onChange={onChange} />
                                    </>
                                )}
                            />
                        )}


                        {/* 먹이 양 (조건부 렌더링) */}
                        {quantityUnit && (
                            <>
                                <Text style={styles.labelText}>먹이 양</Text>

                                {/* quantityUnit 컨트롤러 */}
                                <Controller
                                    control={control}
                                    name="quantityUnit"
                                    render={({ field: { value, onChange } }) => (
                                        <Controller
                                            control={control}
                                            name="quantity"
                                            render={({ field: { value: quantityVal, onChange: onChangeQuantity } }) => (
                                                <FeedQuantity
                                                    quantity={quantityVal}
                                                    setQuantity={onChangeQuantity}
                                                    quantityUnit={value}
                                                    setQuantityUnit={onChange}
                                                    showUnitToggle={showUnitToggle}
                                                    setShowUnitToggle={setShowUnitToggle}
                                                />
                                            )}
                                        />
                                    )}
                                />
                            </>
                        )}


                        {/* 메모 (조건부 렌더링) */}
                        {['fruit', 'vegetable'].includes(selectedFeed) && (
                            <Controller
                                control={control}
                                name="memo"
                                render={({ field: { value, onChange } }) => (
                                    <>
                                        <Text style={styles.labelText}>상세 기록</Text>
                                        <TouchableOpacity style={styles.lineContainer}>
                                            <TextInput
                                                style={styles.memoInput}
                                                placeholder="어떤 과일을 얼마나 먹었는지 메모해보세요."
                                                value={value}
                                                onChangeText={onChange}
                                            />
                                        </TouchableOpacity>
                                    </>
                                )}
                            />
                        )}



                        {/* 삭제하기 */}
                        <TouchableOpacity style={styles.delete}>
                            <Ionicons name="trash-bin-outline" size={15}></Ionicons>
                            <Text style={styles.deleteText}>삭제하기</Text>
                        </TouchableOpacity>
                    </ScrollView>

                    <CustomButton title="저장" onPress={handleSubmit(onSubmit)} />
                </View>
            </View>

        </Modal >
    );
};

export default FeedModal;

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
        marginBottom: 10
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
        width: 18,
        height: 22,
        marginRight: 10
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    labelText: {
        fontSize: 14,
        fontWeight: 'bold',
        left: 0,
        marginTop: 20,
        marginBottom: 10
    },
    lineContainer: {
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    dateText: {
        color: '#2f74e0',
        fontSize: 18,
    },
    delete: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
        opacity: 0.5
    },
    deleteText: {
        fontSize: 13,
        color: Colors.gray,
        marginLeft: 3
    },
    memoInput: {
        fontSize: 16,
        color: Colors.gray,
    }
});