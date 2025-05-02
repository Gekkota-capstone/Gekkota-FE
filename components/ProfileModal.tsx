import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const profileImages = {
    profile1: require('@/assets/images/profile1.png'),
    profile2: require('@/assets/images/profile2.png'),
    profile3: require('@/assets/images/profile3.png'),
    profile4: require('@/assets/images/profile4.png'),
    profile5: require('@/assets/images/profile5.png'),
};

type ProfileKey = keyof typeof profileImages;

interface ProfileModalProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (profileKey: ProfileKey) => void;
    selected: ProfileKey;
}

const ProfileModal = ({ visible, onSelect, onClose, selected }: ProfileModalProps) => {
    return (
        <Modal
            animationType="fade"
            transparent
            visible={visible}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>변경할 프로필을 선택해주세요</Text>

                    <View style={styles.list}>
                        {Object.keys(profileImages).map((key) => (
                            <TouchableOpacity
                                key={key}
                                onPress={() => {
                                    onSelect(key as ProfileKey);
                                    onClose();
                                }}
                            >
                                <Image
                                    source={profileImages[key as ProfileKey]}
                                    style={[
                                        styles.image,
                                        selected === key && styles.selectedBorder,
                                    ]}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                        <Text style={{ color: '#666' }}>닫기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ProfileModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 16,
        width: '90%',
        alignItems: 'center',
    },
    title: {
        fontWeight: '700',
        fontSize: 18,
        marginBottom: 12,
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        margin: 6,
    },
    selectedBorder: {
        borderWidth: 3,
        borderColor: '#4A90E2',
    },
    cancelButton: {
        marginTop: 16,
    },
});
