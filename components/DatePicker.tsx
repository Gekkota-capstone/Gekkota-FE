import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

interface DateTimePickerProps {
  value: string;  // 날짜 값은 Date 타입
  onChange: (date: string) => void;  // 날짜 변경 시 실행되는 함수
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ value, onChange }) => {
  const [mode, setMode] = useState<'date' | 'time' | 'datetime'>('date');
  const [visible, setVisible] = useState(false); // 모달 노출 여부

  const onPressDate = () => {
    setMode('date');
    setVisible(true);
  };

  const onPressTime = () => {
    setMode('time');
    setVisible(true);
  };

  const safeDate = value ? new Date(value) : new Date();

  const onConfirm = (selectedDate: Date) => {
    setVisible(false);
    const formattedDate = format(selectedDate, 'yyyy-MM-dd'); // 날짜를 YYYY-MM-DD 형식으로 포맷
    onChange(formattedDate); // 포맷된 날짜를 부모로 전달
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
        <Pressable style={styles.select} onPress={onPressDate}>
          <Text style={styles.text}>{format(new Date(safeDate), 'PPP', { locale: ko })}</Text>
          <Ionicons name="chevron-down-outline" size={10} color={Colors.gray} style={{opacity: 0.5}}></Ionicons>
        </Pressable>
      <View style={styles.separator} />

      <DateTimePickerModal
        isVisible={visible}
        mode="date"
        onConfirm={onConfirm}
        onCancel={onCancel}
        date={safeDate}
        locale="ko"
        cancelTextIOS="취소"
        confirmTextIOS="확인"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,

  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: Colors.gray,
    opacity: 0.5,
    fontSize: 18,
  },
  separator: {
    alignItems: 'center',
    height: 1,
    backgroundColor: Colors.gray,
    opacity: 0.5,
    marginVertical: 10,
    width: 350
  },
});

export default DateTimePicker;
