import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheetBase from './BottomSheet';
import { colors } from '@/constants';

interface SheddingSheetProps {
  visible: boolean;
  selected: string;
  list: string[];
  onSelect: (value: string) => void;
  onClose: () => void;
}

export default function SheddingSheet({
  visible,
  selected,
  list,
  onSelect,
  onClose,
}: SheddingSheetProps) {
  return (
    <BottomSheetBase
      visible={visible}
      onClose={onClose}
    >
      {list.map((item) => (
        <TouchableOpacity
          key={item}
          onPress={() => {
            onSelect(item);
            onClose();
          }}
        >
          <Text style={[styles.item, selected === item && styles.selected]}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </BottomSheetBase>
  );
}

const styles = StyleSheet.create({
  item: {
    fontSize: 16,
    paddingVertical: 12,
  },
  selected: {
    color: colors.BLUE_500,
    fontWeight: '600',
  },
});
