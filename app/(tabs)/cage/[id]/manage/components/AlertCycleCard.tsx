import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import NumberPickerModal from '@/components/NumberPickerModal';

interface AlertCycleCardProps {
  recentDate: string;
  nextDate: string;
  dDay: number;
  interval: number;
  onSelectInterval: (interval: number) => void;
  onPressCycle: () => void;
  onPressAlert: () => void;
}

function AlertCycleCard({
  recentDate,
  nextDate,
  dDay,
  interval,
  onSelectInterval,
  onPressCycle,
  onPressAlert,
}: AlertCycleCardProps) {

  const [isModalVisible, setModalVisible] = useState(false);

  const handleSelectNumber = (selectedNumber: number) => {
    setModalVisible(false);
    onSelectInterval(selectedNumber);
  };

  const openModal = () => {
    setModalVisible(true); // 알림 버튼 클릭 시 모달 열기
  };

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.dateColumn}>
          <Text style={styles.label}>최근</Text>
          <Text style={styles.date}>{recentDate}</Text>
        </View>

        <TouchableOpacity
          onPress={onPressCycle}
          style={styles.progressWrapper}
        >
          <View style={styles.progressBar}>
            <View style={[styles.filledBar, { width: 157 }]} />
            <View style={styles.labelOverlay}>
              <Text style={styles.progressText}>D-{dDay}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.dateColumn}>
          <Text style={styles.label}>다음</Text>
          <Text style={styles.date}>{nextDate}</Text>
        </View>
      </View>

      {/* 알림 */}
      <TouchableOpacity
        onPress={openModal}
        style={styles.alertRow}
      >
        <Text style={styles.label}>알림</Text>
        <View
          style={styles.alertRight}

        >
          <Text style={styles.alertText}>{interval}일 간격으로</Text>
          <Ionicons
            name='chevron-forward-outline'
            size={20}
          />
        </View>
      </TouchableOpacity>
      <NumberPickerModal
        visible={isModalVisible} // 모달 상태 관리
        onSelectNumber={handleSelectNumber} // 숫자 선택 처리
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.light_gray,
    padding: 16,
    marginVertical: 24,
    borderRadius: 20,
    width: '100%',
    height: 130,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateColumn: {
    alignItems: 'center',
  },
  label: {
    color: '#222',
    fontSize: 14,
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    fontWeight: '500',
  },
  progressWrapper: {
    flex: 1,
    marginHorizontal: 12,
    alignItems: 'center',
    position: 'relative',
  },
  progressBar: {
    backgroundColor: 'rgba(74, 125, 255, 0.1)',
    borderRadius: 999,
    height: 37,
    width: 205,
    position: 'relative',
  },
  filledBar: {
    backgroundColor: colors.mainBlue,
    height: '100%',
    borderRadius: 999,
    overflow: 'hidden',
  },
  labelOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  progressText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  alertRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertText: {
    color: '#2D6AE3',
    fontSize: 15,
    fontWeight: '500',
    marginRight: 6,
  },
  arrow: {
    fontSize: 18,
    color: '#333',
  },
});

export default AlertCycleCard;
