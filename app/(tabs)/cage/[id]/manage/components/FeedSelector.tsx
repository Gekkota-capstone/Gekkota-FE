import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { feedData, feedImages, FeedKey } from '../constants/feeding';
import { colors } from '@/constants';

interface FeedSelectorProps {
    value: string | null;
    onChange: (key: FeedKey) => void;
}

const FeedSelector = ({ value, onChange }: FeedSelectorProps) => {
    return (
        <View style={styles.feedContainer}>
            {feedData.map((feed) => {
                const isSelected = value === feed.key;
                const image = isSelected
                    ? feedImages[feed.key].color
                    : feedImages[feed.key].bw;

                return (
                    <TouchableOpacity
                        key={feed.key}
                        onPress={() => onChange(feed.key)}
                        style={styles.feedItem}
                    >
                        <View style={[styles.feedBackground, isSelected && { backgroundColor: 'white', borderWidth: 1 }]}>
                            <Image
                                source={image}
                                style={styles.feedImage}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={[styles.feedText, isSelected && { opacity: 1 }]}>
                            {feed.name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default FeedSelector;

const styles = StyleSheet.create({
    feedContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 5,
    },
    feedItem: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 5
    },
    feedBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        backgroundColor: colors.light_gray,
        borderRadius: 16
    },
    feedImage: {
        width: 57.6,
        height: 41.6,
    },
    feedText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
        opacity: 0.5,
        marginTop: 5
    },
});
