import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants';
import { useDeleteHealthRecord } from '@/hooks/useDeleteHealthRecord';
import { useLocalSearchParams } from 'expo-router';

interface HealthRecordData {
  id: number;
  date: string;
  weight: string;
  memo: string;
  photoUri?: string;
  sheddingStatus: null | '탈피예정' | '탈피 중' | '탈피 완료' | '탈피 실패';
}

interface HealthDetailModalProps {
  visible: boolean;
  onClose: () => void;
  data: HealthRecordData;
}

export default function HealthDetailModal({
  visible,
  onClose,
  data,
}: HealthDetailModalProps) {
  const { id } = useLocalSearchParams();
  const { mutate: deleteHealth } = useDeleteHealthRecord(id as string, onClose);
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      animationIn='slideInUp'
      animationOut='slideOutDown'
      backdropOpacity={0.5}
      style={styles.modalWrapper}
    >
      <View style={styles.modalContent}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons
              name='close-outline'
              size={25}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>건강 기록</Text>
          <View />
        </View>

        {/* 본문 */}
        <View style={styles.body}>
          <View style={styles.row}>
            <Text style={styles.label}>날짜</Text>
            <Text style={styles.value}>{data.date}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>몸무게</Text>
            <Text style={styles.value}>{data.weight}</Text>
          </View>

          {data.sheddingStatus && (
            <View style={styles.row}>
              <Text style={styles.label}>탈피 상태</Text>
              <Text style={styles.value}>{data.sheddingStatus}</Text>
            </View>
          )}

          <View style={styles.memoContainer}>
            <Text style={styles.label}>메모</Text>
            <Text style={styles.memoText}>
              {data.memo || '기록된 메모가 없습니다.'}
            </Text>
          </View>

          {data.photoUri && (
            <Image
              source={{ uri: data.photoUri }}
              style={styles.image}
              resizeMode='cover'
            />
          )}
        </View>
        <TouchableOpacity
          style={styles.delete}
          onPress={() => deleteHealth(data.date)}
        >
          <Ionicons
            name='trash-bin-outline'
            size={15}
          ></Ionicons>
          <Text style={styles.deleteText}>삭제하기</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '60%',
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerIcon: {
    opacity: 0.5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.BLACK,
    textAlign: 'center',
  },
  body: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.GRAY_700,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.BLACK,
  },
  memoContainer: {
    marginTop: 10,
  },
  memoText: {
    fontSize: 14,
    color: colors.GRAY_700,
    lineHeight: 20,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    backgroundColor: colors.GRAY_200,
    marginTop: 16,
  },
  delete: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    opacity: 0.5,
  },
  deleteText: {
    fontSize: 13,
    color: colors.GRAY_700,
    marginLeft: 3,
  },
});
