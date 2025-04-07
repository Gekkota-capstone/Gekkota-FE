import { SetStateAction, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { colors } from '@/constants';
import dayjs from 'dayjs';

const screenWidth = Dimensions.get('window').width;

const generateWeek = (date: dayjs.Dayjs) => {
  const startOfWeek = date.startOf('week'); // Sunday
  return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));
};

export default function HealthCalendar() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [currentWeekStart, setCurrentWeekStart] = useState(
    dayjs().startOf('week')
  );
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const weekDays = generateWeek(currentWeekStart);

  const goToPreviousWeek = () => {
    setCurrentWeekStart((prev) => prev.subtract(1, 'week'));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart((prev) => prev.add(1, 'week'));
  };

  const handleSelectDate = (dateString: string) => {
    const newDate = dayjs(dateString);
    setSelectedDate(newDate);
    setCurrentWeekStart(newDate.startOf('week'));
    setCalendarVisible(false);
  };

  const renderDay = (item: dayjs.Dayjs) => {
    const isSelected = item.isSame(selectedDate, 'day');

    return (
      <TouchableOpacity
        key={item.format('YYYY-MM-DD')}
        onPress={() => setSelectedDate(item)}
        style={styles.dayItem}
      >
        <Text style={isSelected ? styles.selectedDay : styles.day}>
          {item.format('dd')}
        </Text>
        <View style={isSelected ? styles.selectedCircle : styles.dateWrapper}>
          <Text style={isSelected ? styles.selectedDateText : styles.dateText}>
            {item.format('D')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setCalendarVisible(true)}>
        <Text style={styles.selectedDateTextLabel}>
          {selectedDate.format('YYYY년 MM월 DD일')}
        </Text>
      </TouchableOpacity>

      {/* 주차 이동 버튼 */}
      <View style={styles.navigation}>
        <TouchableOpacity onPress={goToPreviousWeek}>
          <Text style={styles.navText}>{'<'}</Text>
        </TouchableOpacity>
        <FlatList
          data={weekDays}
          keyExtractor={(item) => item.format('YYYY-MM-DD')}
          horizontal
          scrollEnabled={false}
          renderItem={({ item }) => renderDay(item)}
        />
        <TouchableOpacity onPress={goToNextWeek}>
          <Text style={styles.navText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* 달력 모달 */}
      <Modal
        visible={isCalendarVisible}
        transparent
        animationType='slide'
        onRequestClose={() => setCalendarVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setCalendarVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Calendar
              current={selectedDate.format('YYYY-MM-DD')}
              onDayPress={(day: { dateString: string }) =>
                handleSelectDate(day.dateString)
              }
              markedDates={{
                [selectedDate.format('YYYY-MM-DD')]: {
                  selected: true,
                  selectedColor: colors.BLUE_500,
                },
              }}
              theme={{
                todayTextColor: colors.BLUE_500,
                selectedDayBackgroundColor: colors.BLUE_500,
              }}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 12,
  },
  selectedDateTextLabel: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: colors.BLACK,
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.GRAY_700,
    paddingHorizontal: 8,
  },
  dayItem: {
    width: screenWidth / 9,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  day: {
    color: colors.GRAY_500,
    fontSize: 12,
  },
  selectedDay: {
    color: colors.BLUE_500,
    fontWeight: '700',
    fontSize: 12,
  },
  dateWrapper: {
    marginTop: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  dateText: {
    fontSize: 14,
    color: colors.GRAY_700,
    fontWeight: '600',
  },
  selectedDateText: {
    fontSize: 14,
    color: colors.WHITE,
    fontWeight: '700',
  },
  selectedCircle: {
    backgroundColor: colors.BLUE_500,
    marginTop: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.WHITE,
    padding: 20,
    borderRadius: 12,
    width: '90%',
  },
});
