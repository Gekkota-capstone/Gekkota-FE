// 이전 버튼
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

interface PreviousButtonProps {
    onPrevious: () => void;
    style?: object;
}

const PreviousButton: React.FC<PreviousButtonProps> = ({ onPrevious, style }) => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back(); // 뒤로가기
      };


    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity
                style={styles.previousButton}
                onPress={onPrevious}>
                <Ionicons name="chevron-back-outline" size={30} color="black"></Ionicons>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        
    },
    previousButton: {
        justifyContent: 'flex-start',
        padding: 20,
        zIndex: 1
      
    }
});

export default PreviousButton;