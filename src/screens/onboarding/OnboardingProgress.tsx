import React from 'react';
import { View, StyleSheet } from 'react-native';

import { COLORS } from '../../theme/colors';

type Props = {
  total: number;
  current: number;
};

export default function OnboardingProgress({
  total,
  current,
}: Props) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === current && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
  },

  activeDot: {
    width: 24,
    backgroundColor: COLORS.primary,
  },
});