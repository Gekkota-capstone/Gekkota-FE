import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants';
import { useDeleteFeedRecord } from '@/hooks/useDeleteFeedRecord';
import { useLocalSearchParams } from 'expo-router';
import { useGetFeedRecord } from '@/hooks/useGetFeedRecord';

interface FeedRecordData {
  id: number;
  date: string;
  food_type:
  | '사료'
  | '귀뚜라미'
  | '밀웜'
  | '슈퍼밀웜'
  | '왁스웜'
  | '누에'
  | '과일'
  | '채소';
  food_size: null | '극소' | '소' | '중' | '대' | '특대';
  food_amount: number | null;
  amount_unit: null | '마리' | 'ml' | 'g';
  memo: string | null;
}

interface FeedDetailModalProps {
  visible: boolean;
  onClose: () => void;
  data: FeedRecordData;
  onDeleted: () => void;
}

export default function FeedDetailModal({
  visible,
  onClose,
  data,
  onDeleted,
}: FeedDetailModalProps) {
  const { id } = useLocalSearchParams();
  const { mutate: deleteFeed } = useDeleteFeedRecord(id as string, onClose);

  const handleDelete = () => {
    deleteFeed({ date: data.date, food_type: data.food_type }, {
      onSuccess: () => {
        onDeleted();  // 삭제 성공 후 호출
        onClose();    // 모달 닫기 등
      }
      ,
      onError: (error) => {
        console.error('삭제 실패:', error);
      }
    });
  };

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
          <Text style={styles.headerText}>급여 기록</Text>
          <View style={{ width: 25 }} />
        </View>

        {/* 본문 */}
        <View style={styles.body}>
          <View style={styles.row}>
            <Text style={styles.label}>날짜</Text>
            <Text style={styles.value}>{data.date}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>먹이 종류</Text>
            <Text style={styles.value}>{data.food_type}</Text>
          </View>
          {data.food_size && (
            <View style={styles.row}>
              <Text style={styles.label}>먹이 사이즈 </Text>
              <Text style={styles.value}>{data.food_size}</Text>
            </View>
          )}

          {data.food_amount && (
            <View style={styles.row}>
              <Text style={styles.label}>먹이 양</Text>
              <Text style={styles.value}>
                {String(data.food_amount)}
                {data.amount_unit}
              </Text>
            </View>
          )}

          {data.memo && (
            <View style={styles.memoContainer}>
              <Text style={styles.label}>메모</Text>
              <Text style={styles.memoText}>
                {data.memo || '기록된 메모가 없습니다.'}
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.delete}
          onPress={handleDelete}
        >
          <Ionicons
            name='trash-bin-outline'
            size={15}
          />
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
