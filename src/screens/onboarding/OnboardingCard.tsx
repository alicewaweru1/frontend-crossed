import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLORS } from '../../theme/colors';
import { OnboardingItem } from './OnboardingData';

type Props = {
  item: OnboardingItem;
};

export default function OnboardingCard({ item }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{item.label}</Text>

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.description}>
          {item.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },

  label: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 24,
  },

  content: {
    gap: 18,
  },

  title: {
    color: COLORS.primary,
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 43,
  },

  description: {
    color: COLORS.text,
    fontSize: 16,
    lineHeight: 26,
  },
});