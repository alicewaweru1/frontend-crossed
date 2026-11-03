import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Crossed</Text>

      <Text style={styles.subtitle}>
        Fewer profiles, better connections.
      </Text>

      <Text style={styles.description}>
        Discover a more intentional approach to meaningful connections.
      </Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 17,
    color: COLORS.secondary,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 24,
  },
});