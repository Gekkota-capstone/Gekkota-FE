import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PrimaryButton from '@/components/PrimaryButton';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const DeleteModal = ({ visible, onClose }: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <View style={styles.container}>
            <Text style={styles.title}>반려동물 정보를 지우시겠어요?</Text>
            <Text style={styles.text}>
              삭제 시 모든 기록이 사라지며,{'\n'}
              이후 복구는 불가능해요.{'\n'}
              정말 모든 정보를 삭제할까요?
            </Text>
            <PrimaryButton
              title='다시 생각해보기'
              onPress={onClose}
              style={styles.button}
            />
            <TouchableOpacity style={styles.delete}>
              <Text style={styles.deleteText}>정보 지우기</Text>
              <View style={styles.separator} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: 'white',
    width: 345,
    height: 243,
    padding: 24,
    borderRadius: 16,
    elevation: 5,
    shadowColor: '#000',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    marginVertical: 12,
    textAlign: 'center',
  },
  separator: {
    alignItems: 'center',
    height: 1,
    backgroundColor: 'black',
    opacity: 0.5,
    width: 60,
  },
  button: {
    bottom: 30,
    width: 297,
    height: 50,
  },
  delete: {
    position: 'absolute',
    bottom: 0,
  },
  deleteText: {
    fontSize: 13,
    textAlign: 'center',
  },
});

export default DeleteModal;
