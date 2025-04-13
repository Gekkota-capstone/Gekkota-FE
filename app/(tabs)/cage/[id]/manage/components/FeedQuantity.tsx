import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { feedData, feedImages, FeedKey } from '../constants/feeding';
import { Colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';

interface FeedQuantityProps {
    quantity: number;
    setQuantity: (val: number) => void;
    quantityUnit: string | null;
    setQuantityUnit: (unit: string | null) => void;
    showUnitToggle: boolean;
    setShowUnitToggle: (bool: boolean) => void;
  }
  

const FeedQuantity = ({ quantity, setQuantity, quantityUnit, setQuantityUnit, showUnitToggle, setShowUnitToggle }: FeedQuantityProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.quantityContainer}>
                <Text style={styles.quantityNumber}>{quantity}</Text>
                <Text>{quantityUnit}</Text>
            </View>
            <View style={styles.seperator}></View>
            <View style={styles.quantityControlContainer}>
                <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => setQuantity(Math.max(0, quantity - 1))}
                >
                    <Text style={styles.quantitySymbol}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => setQuantity(Math.max(0, quantity + 1))}
                >
                    <Text style={styles.quantitySymbol}>+</Text>
                </TouchableOpacity>
            </View>
            { showUnitToggle && (
                <TouchableOpacity
                style={styles.unitChangeContainer}
                onPress={() => setQuantityUnit(quantityUnit === 'g' ? 'ml' : 'g')}
            >
                <View style={styles.unitChangeBackground}>
                    <Ionicons name="sync-outline" color={'white'}></Ionicons>
                </View>
                <Text style={styles.unitChangeText}>단위변환</Text>
            </TouchableOpacity>
            )}
        </View>
    )
};

export default FeedQuantity;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    quantityNumber: {
        fontSize: 50,
        fontWeight: 'bold',
        marginLeft: 30,
        marginRight: 5,
        alignSelf: 'center'
    },
    seperator: {
        height: 1,
        backgroundColor: 'black',
        opacity: 0.5,
        marginLeft: 16,
        width: 45
    },
    quantityControlContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    quantityButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.disabledBlue,
        borderRadius: 12,
        marginTop: 20,
        width: 120,
        height: 40,
        marginHorizontal: 5
    },
    quantitySymbol: {
        color: Colors.mainBlue,
        fontSize: 32
    },
    unitChangeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: Colors.gray,
        marginTop: 10,
        gap: 5
    },
    unitChangeBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.mainBlue,
        opacity: 1,
        borderRadius: 12,
        width: 15,
        height: 15
    },
    unitChangeText: {
        fontSize: 12,
        opacity: 0.5
    }
});