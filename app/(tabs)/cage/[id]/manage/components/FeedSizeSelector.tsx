import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { feedData, feedImages, FeedKey, sizes } from '../constants/feeding';
import { colors } from '@/constants';

interface FeedSizeSelectorProps {
    value: string | null;
    onChange: (id: string) => void;
}

const FeedSizeSelector = ({ value, onChange }: FeedSizeSelectorProps) => {
    return (
    <View style={styles.sizeContainer}>
        {sizes.map((size) => {
            const isSelected = value === size;
            return (
                <TouchableOpacity
                    key={size}
                    style={[
                        styles.sizeButton,
                        isSelected && styles.selectedSizeButton,
                    ]}
                    onPress={() => onChange(size)}
                >
                    <Text
                        style={[
                            styles.sizeText,
                            isSelected && { opacity: 1 },
                        ]}
                    >
                        {size}
                    </Text>
                </TouchableOpacity>
            );
        })}
    </View>
    );
};

export default FeedSizeSelector;

const styles = StyleSheet.create({
    sizeContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    sizeText: {
        fontSize: 13,
        color: colors.gray,
        fontWeight: 'bold',
        opacity: 0.5
    },
    sizeButton: {
        backgroundColor: colors.light_gray,
        borderRadius: 20,
        marginHorizontal: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    selectedSizeButton: {
        backgroundColor: 'white',
        borderColor: colors.gray,
        borderWidth: 1,
    },
});