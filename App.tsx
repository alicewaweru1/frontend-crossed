import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

import CrossedButton from './src/components/CrossedButton';
import { COLORS } from './src/theme/colors';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CROSSED</Text>

      <Text style={styles.subtitle}>
        Fewer profiles, better connections.
      </Text>

      <CrossedButton
        title="Get Started"
        onPress={() => Alert.alert('Welcome to Crossed!')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 4,
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 40,
    textAlign: 'center',
  },
});