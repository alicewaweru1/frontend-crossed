import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import COLORS from '../constants/colors';

import { AuthButtonProps } from '../types/auth';

const AuthButton: React.FC<AuthButtonProps> = ({
  title,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.secondary,
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },

  disabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AuthButton;