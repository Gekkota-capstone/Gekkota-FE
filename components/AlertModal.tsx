import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface InfoUpdateModalProps {
    visible: boolean;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

const InfoUpdateModal = ({ visible, onConfirm, title, message }: InfoUpdateModalProps) => {
    return (
        <Modal
            animationType="fade"
            transparent
            visible={visible}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>{title}</Text>
                     <Text style={styles.message}>{message}</Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                            <Text style={styles.confirmText}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default InfoUpdateModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        width: 350,
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 20,
    },
    message: {
        fontSize: 14,
        color: '#333',
        marginBottom: 24,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
    },
    confirmButton: {
        backgroundColor: '#3478f6',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmText: {
        color: '#fff',
        fontWeight: '600',
    },
});
