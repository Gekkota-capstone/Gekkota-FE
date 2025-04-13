import React, { useMemo, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

interface DateTimePickerProps {
  value: string; // yyyy-MM-dd 형태
  onChange: (date: string) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  style,
  textStyle,
}) => {
  const [visible, setVisible] = useState(false);

  const safeDate = useMemo(() => {
    return value ? new Date(value) : new Date();
  }, [value]);

  const handleConfirm = (selectedDate: Date) => {
    setVisible(false);
    const formattedDate = format(selectedDate, 'yyyy-MM-dd'); // string 변환
    onChange(formattedDate);
  };

  return (
    <View style={[styles.container, style]}>
      <Pressable
        style={styles.select}
        onPress={() => setVisible(true)}
      >
        <Text style={[styles.text, textStyle]}>
          {format(safeDate, 'PPP', { locale: ko })}
        </Text>
        <Ionicons
          name='chevron-down-outline'
          size={14}
          color={Colors.gray}
          style={{ opacity: 0.5, marginLeft: 4 }}
        />
      </Pressable>

      <View style={styles.separator} />

      <DateTimePickerModal
        isVisible={visible}
        mode='date'
        date={safeDate}
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
        locale='ko'
        cancelTextIOS='취소'
        confirmTextIOS='확인'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: Colors.gray,
    opacity: 0.8,
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.gray,
    opacity: 0.2,
    marginTop: 8,
    width: 350,
  },
});

export default DateTimePicker;
