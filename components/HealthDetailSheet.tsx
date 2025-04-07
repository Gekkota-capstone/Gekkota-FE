import React from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import BottomSheetBase from './BottomSheet';

interface HealthDetailSheetProps {
  visible: boolean;
  onClose: () => void;
  data: {
    date: string;
    weight: string;
    memo: string;
    photoUri?: string;
  };
}

export default function HealthDetailSheet({
  visible,
  onClose,
  data,
}: HealthDetailSheetProps) {
  return (
    <BottomSheetBase
      visible={visible}
      onClose={onClose}
    >
      <Text style={styles.title}>건강 기록</Text>
      <Text>{data.date}</Text>
      <Text>몸무게: {data.weight}</Text>
      <Text>{data.memo}</Text>
      {data.photoUri && (
        <Image
          source={{ uri: data.photoUri }}
          style={styles.image}
        />
      )}
    </BottomSheetBase>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  image: {
    marginTop: 16,
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
});
