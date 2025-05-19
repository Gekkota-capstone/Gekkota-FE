import { colors } from '@/constants';
import { useGetList } from '@/hooks/useGetList';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

interface PetNameDropdownProps {
    isVisible: boolean;
    onPress: () => void;
    onClose: () => void;
}

export default function PetNameDropdown({ isVisible, onPress, onClose }: PetNameDropdownProps) {
    const { data, isLoading, error } = useGetList();

    if (isLoading) return <Text style={styles.loading}>로딩 중...</Text>;
    if (error || !data) return <Text style={styles.loading}>에러 발생</Text>;

    const list = Array.isArray(data) ? data : [data];


    return (
        <View>
            <Modal
                isVisible={isVisible}
                onBackdropPress={onClose}
                backdropOpacity={0.3}
                style={styles.modal}
            >
                <View style={styles.modalContent}>
                    <FlatList
                        data={list}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                            style={styles.item}
                            onPress={onPress}>
                                <Text style={styles.itemText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 8,
        backgroundColor: colors.GRAY_100,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        justifyContent: 'center',
        margin: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemText: {
        fontSize: 16,
    },
    loading: {
        
    }
});