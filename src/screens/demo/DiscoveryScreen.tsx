import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { DemoScreenShell, Pill } from '../../components/DemoComponents';
import { useDemoProfile } from '../../context/DemoProfileContext';
import type { DemoStackParamList } from '../../navigation/types';
import { COLORS } from '../../theme/colors';
import { RADIUS, SPACING } from '../../theme/spacing';

type Props = NativeStackScreenProps<DemoStackParamList, 'Discovery'>;

export default function DiscoveryScreen({ navigation }: Props) {
  const { profile, completeDiscovery } = useDemoProfile();
  const [pulse] = useState(() => new Animated.Value(0.82));
  const preferences = [...profile.interests.slice(0, 2), ...profile.values.slice(0, 2)];

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: false }),
        Animated.timing(pulse, { toValue: 0.82, duration: 700, useNativeDriver: false }),
      ]),
    );
    animation.start();
    const timer = setTimeout(() => {
      completeDiscovery();
      navigation.replace('FiveCrosses');
    }, 2200);

    return () => {
      animation.stop();
      clearTimeout(timer);
    };
  }, [completeDiscovery, navigation, pulse]);

  return (
    <DemoScreenShell
      title="Taking a thoughtful pause."
      subtitle="Bringing your interests, values and pace into a considered view."
      activeTab="FiveCrosses"
      onBack={() => navigation.goBack()}
    >
      <View style={styles.centerpiece}>
        <View style={styles.orbit}>
          <View style={styles.orbitVertical} />
          <View style={styles.orbitHorizontal} />
          <Animated.View style={[styles.centerMark, { transform: [{ scale: pulse }] }]}>
            <Text style={styles.centerSymbol}>✳</Text>
          </Animated.View>
        </View>
        <Text style={styles.status}>Considering what matters to you</Text>
        <Text style={styles.supporting}>Interests, values and a compatible pace—brought together with care.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>WHAT MATTERS TO YOU</Text>
        <View style={styles.pills}>
          {preferences.length > 0
            ? preferences.map((item) => <Pill key={item}>{item}</Pill>)
            : <Text style={styles.empty}>A little room for discovery</Text>}
        </View>
      </View>
      <Text style={styles.disclosure}>Illustrative introductions</Text>
    </DemoScreenShell>
  );
}

const styles = StyleSheet.create({
  centerpiece: {
    minHeight: 300,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  orbit: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: '#B9C9BD',
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitVertical: {
    position: 'absolute',
    width: 1,
    height: 178,
    backgroundColor: '#D5DED6',
  },
  orbitHorizontal: {
    position: 'absolute',
    width: 178,
    height: 1,
    backgroundColor: '#D5DED6',
  },
  centerMark: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderWidth: 6,
    borderColor: '#E8EFE9',
  },
  centerSymbol: {
    color: COLORS.secondary,
    fontSize: 39,
  },
  status: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  supporting: {
    maxWidth: 320,
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
  },
  card: {
    gap: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardLabel: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  empty: {
    color: COLORS.muted,
    fontSize: 11,
  },
  disclosure: {
    color: COLORS.muted,
    fontSize: 10,
    textAlign: 'center',
  },
});
