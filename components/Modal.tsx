import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

interface ModalSelectorProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (option: string) => void;
  data: { label: string; key: string }[];
  title: string;
  selectedOption: string;
}

const ModalSelector: React.FC<ModalSelectorProps> = ({ isVisible, onClose, onSelect, data, title, selectedOption }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{title}</Text>
        {data.map((option, index) => (
          <View key={option.key}>
            <TouchableOpacity
              onPress={() => {
                onSelect(option.label);
                onClose(); 
              }}
              style={styles.option}
            >
               <Text
                style={[
                  styles.optionText,
                  option.label === selectedOption && {opacity: 1},
                ]}
              >
                {option.label} 
              </Text>
            </TouchableOpacity>
            {index < data.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    minHeight: 100,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  option: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.gray,
    opacity: 0.5
  },
  separator: {
    alignItems: 'center',
    height: 1,
    backgroundColor: '#ccc',
    opacity: 0.5,
    width: 350,
    marginVertical: 20
  },
});

export default ModalSelector;
