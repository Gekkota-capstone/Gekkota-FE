import { colors } from '@/constants';
import { Link, router } from 'expo-router';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface NotificationCardProps {
    name: string;
    type: '급여' | '청소' | string;
    status: '알림' | '지연' | string;
    time: number;
}

export default function NotificationCard({ name, type, status, time }: NotificationCardProps) {
    const getMessage = () => {
        if (type === '급여') {
            return status === '알림'
                ? `${name}가 식사를 기다리고 있습니다. \n오늘 급여해 주세요.`
                : `${name}가 아직 식사를 하지 못했습니다. \n빠르게 확인해 주세요.`;
        }

        if (type === '청소') {
            return status === '알림'
                ? `${name}의 집 청소일입니다. 깔끔하게 청소해주세요.`
                : `${name}의 집이 아직 청소되지 않았어요. \n지금 청소해 주세요.`;
        }

        return '';
    };
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <View style={styles.content}>
                    <Image
                        style={styles.image}
                        resizeMode="contain"
                        source={
                            type === '급여'
                                ? require('@/assets/images/manage/feeding.png')
                                : require('@/assets/images/manage/cleaning.png')
                        }
                    />
                    <Text style={styles.titleText}>{`${type}${status}`}</Text>
                </View>
                <Text style={styles.timeText}>{`${time}시간 전`}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.detailText}>{getMessage()}</Text>
            </View>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 15,
        marginRight: 20,
        marginBottom: 5
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 14,
        height: 17,
        marginRight: 10,
    },
    titleText: {
        fontSize: 14,
    },
    timeText: {
        fontSize: 12,
        color: colors.GRAY_700,
    },
    info: {
        flexDirection: 'row',
        marginLeft: 23,
    },
    detailText: {
        fontSize: 16,
    },
});

