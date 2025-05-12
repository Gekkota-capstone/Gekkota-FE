import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface NumberPickerModalProps {
    visible: boolean;
    onSelectNumber: (selectedNumber: number) => void; // 여기서 전달되는 함수 타입을 정의
}

const NumberPickerModal = ({ onSelectNumber, visible }: NumberPickerModalProps) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(1);

    const openModal = () => setModalVisible(true);
    const closeModal = () => {
        onSelectNumber(selectedNumber); // 부모에게 선택된 숫자 전달
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={closeModal}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>급여 주기 설정</Text>
                    <Picker
                        selectedValue={selectedNumber}
                        onValueChange={(itemValue) => setSelectedNumber(itemValue)}
                        style={{ width: 150 }}
                    >
                        {[...Array(30)].map((_, index) => (
                            <Picker.Item key={index} label={`${index + 1}`} value={index + 1} />
                        ))}
                    </Picker>

                    <Button title="확인" onPress={closeModal} />
                </View>
            </View>
        </Modal>
    );
};

export default NumberPickerModal;

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: '#007AFF',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 250,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
});
