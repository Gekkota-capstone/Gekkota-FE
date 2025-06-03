import React from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { colors } from '@/constants';

interface PrimaryButtonProps {
  onPress: () => void;
  title: string;
  isDisabled?: boolean;
  style?: ViewStyle | object;
  textStyle?: object;
}

const { width } = Dimensions.get('window');

export default function PrimaryButton(props: PrimaryButtonProps) {
  const { onPress, title, isDisabled, style, textStyle } = props;

  const handlePress = () => {
    if (!isDisabled) {
      onPress();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isDisabled && styles.disabledButton, style]}
        onPress={handlePress}
        disabled={isDisabled}
      >
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-end',
    bottom: 0,
  },
  button: {
    backgroundColor: colors.mainBlue,
    paddingVertical: 15,
    width: width - 60,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: colors.disabledBlue,
  },
});
