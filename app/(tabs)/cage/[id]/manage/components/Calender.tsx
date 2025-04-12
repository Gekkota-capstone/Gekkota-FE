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
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

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
        const koreanWeekDays = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = koreanWeekDays[item.day()]; // 0~6 → 일~토

        return (
            <TouchableOpacity
                key={item.format('YYYY-MM-DD')}
                onPress={() => setSelectedDate(item)}
                style={styles.dayItem}
            >
                <View style={isSelected ? styles.selectedCircle : styles.dateWrapper}>
                    <Text style={isSelected ? styles.selectedDayText : styles.dayText}>
                        {dayOfWeek}
                    </Text>
                    <Text style={isSelected ? styles.selectedDateText : styles.dateText}>
                        {item.format('D')}
                    </Text>
                </View>
                <View
                    style={[styles.outline, isSelected && { backgroundColor: Colors.mainBlue, opacity:1 }
                    ]}
                />

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
                    <Ionicons name="chevron-back-outline" size={20} style={{ marginRight: 5 }}></Ionicons>
                </TouchableOpacity>
                <FlatList
                    data={weekDays}
                    keyExtractor={(item) => item.format('YYYY-MM-DD')}
                    horizontal
                    scrollEnabled={false}
                    renderItem={({ item }) => renderDay(item)}
                />
                <TouchableOpacity onPress={goToNextWeek}>
                    <Ionicons name="chevron-forward-outline" size={20} style={{ marginLeft: 5 }}></Ionicons>
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
        marginTop: 16,
    },

    selectedDateTextLabel: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
        color: colors.BLACK,
    },
    navigation: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },

    dayItem: {
        alignItems: 'center',
        marginHorizontal: 5,
    },

    day: {
        fontSize: 12,
        color: colors.GRAY_500,
        marginBottom: 4,
    },

    selectedDay: {
        fontSize: 12,
        color: colors.WHITE,
        marginBottom: 4,
    },

    dateWrapper: {
        width: 35,
        height: 64,
        borderRadius: 24,
        backgroundColor: colors.GRAY_100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    selectedCircle: {
        width: 35,
        height: 64,
        borderRadius: 24,
        backgroundColor: colors.BLUE_500,
        justifyContent: 'center',
        alignItems: 'center',
    },

    dateText: {
        fontSize: 14,
        color: 'black',
        fontWeight: '600',
        paddingVertical: 3
    },

    selectedDateText: {
        fontSize: 14,
        color: colors.WHITE,
        fontWeight: '700',
        paddingVertical: 3
    },
    selectedDayText: {
        fontSize: 12,
        color: colors.WHITE,
        fontWeight: '700',
    },
    dayText: {
        fontSize: 12,
        color: 'black',
        fontWeight: '600',
    },
    outline: {
        marginTop: 4,
        width: 24,
        height: 2,
        borderRadius: 1,
        backgroundColor: Colors.gray,
        opacity: 0.2,
        alignItems: 'center',
        marginVertical: 10,
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

