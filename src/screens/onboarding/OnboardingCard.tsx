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
    paddingHorizontal: 32,
    paddingVertical: 28,
  },

  label: {
    color: '#A87B21',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 28,
  },

  content: {
    gap: 16,
  },

  title: {
    color: COLORS.primary,
    fontSize: 38,
    fontWeight: '700',
    lineHeight: 46,
    letterSpacing: -0.8,
  },

  description: {
    color: COLORS.text,
    fontSize: 16,
    lineHeight: 27,
  },
});