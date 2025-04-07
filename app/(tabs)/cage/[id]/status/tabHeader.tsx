import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Animated } from 'react-native';
import { Colors } from '@/constants/colors';

type TabValue = 'feed' | 'clean' | 'health';

type TabHeaderProps = {
    activeTab: TabValue;
    setActiveTab: (tab: TabValue) => void;
};

const tabs: { label: string; value: TabValue }[] = [
    { label: '급여', value: 'feed' },
    { label: '청소', value: 'clean' },
    { label: '건강', value: 'health' },
];

const TabHeader: React.FC<TabHeaderProps> = ({ activeTab, setActiveTab }) => {
    const screenWidth = Dimensions.get('window').width;
    const tabWidth = screenWidth / tabs.length;

    const translateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const tabIndex = tabs.findIndex((tab) => tab.value === activeTab);
        Animated.timing(translateX, {
            toValue: tabWidth * tabIndex,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [activeTab]);

    return (
        <SafeAreaView >
            <View style={styles.container}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.value}
                        style={styles.tab}
                        onPress={() => setActiveTab(tab.value)}
                    >
                        <Text style={[styles.tabText, activeTab === tab.value && styles.activeText]}>
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View
                style={styles.separator}
            />
            <Animated.View
                style={[
                    styles.activeIndicator,
                    { width: 135, transform: [{ translateX }] },
                ]}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tab: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabText: {
        color: Colors.gray,
        opacity: 0.5,
        fontSize: 16,
    },
    activeText: {
        color: 'black',
        opacity: 1,
    },
    separator: {
        height: 1,
        backgroundColor: Colors.gray,
        opacity: 0.5,
        marginVertical: 10,
        width: '100%',
    },
    activeIndicator: {
        height: 2,
        backgroundColor: 'black',
        position: 'absolute',
        bottom: 0,
        left: 0,
        marginVertical: 10,
    },
});

export default TabHeader;
