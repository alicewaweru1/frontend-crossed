import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { DemoNotice, DemoScreenShell, Pill } from '../../components/DemoComponents';
import { useDemoProfile } from '../../context/DemoProfileContext';
import type { DemoStackParamList } from '../../navigation/types';
import { COLORS } from '../../theme/colors';
import { RADIUS, SPACING } from '../../theme/spacing';

type Props = NativeStackScreenProps<DemoStackParamList, 'DiscoveryIntro'>;

export default function DiscoveryIntroScreen({ navigation }: Props) {
  const { profile, avatar } = useDemoProfile();
  const preferences = [
    ...profile.interests,
    ...profile.values,
    ...profile.lifestyle,
    ...profile.qualities,
  ];

  return (
    <DemoScreenShell
      title="A more considered introduction."
      subtitle="Your choices bring a more considered set of stories into view."
      activeTab="FiveCrosses"
      onBack={() => navigation.navigate('ProfileSetup')}
    >
      <DemoNotice>A profile shaped around {avatar.name}</DemoNotice>
      <View style={styles.profileCard}>
        <View style={[styles.avatar, { backgroundColor: avatar.background }]}>
          <Text style={[styles.avatarText, { color: avatar.foreground }]}>{avatar.initials}</Text>
          <Text style={[styles.avatarSymbol, { color: avatar.foreground }]}>{avatar.symbol}</Text>
        </View>
        <View style={styles.profileCopy}>
          <Text style={styles.profileName}>{avatar.name}</Text>
          <Text style={styles.profileSub}>Illustrative profile</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.eyebrow}>WHAT YOU CHOSE</Text>
        <Text style={styles.cardTitle}>A few details that make a difference.</Text>
        <View style={styles.pills}>
          {preferences.length > 0
            ? preferences.map((item) => <Pill key={item}>{item}</Pill>)
            : <Text style={styles.empty}>Your sample profile is open to a little serendipity.</Text>}
        </View>
      </View>

      <View style={styles.promise}>
        <Text style={styles.promiseMark}>✳</Text>
        <Text style={styles.promiseText}>
          Interests, values and pace can help bring meaningful stories into view.
        </Text>
      </View>

      <Pressable
        onPress={() => navigation.navigate('Discovery')}
        style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
        accessibilityRole="button"
      >
        <Text style={styles.primaryButtonText}>Find My Five Crosses</Text>
        <Text style={styles.primaryArrow}>›</Text>
      </Pressable>
    </DemoScreenShell>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '800',
  },
  avatarSymbol: {
    position: 'absolute',
    top: 5,
    right: 8,
    fontSize: 14,
  },
  profileCopy: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '700',
  },
  profileSub: {
    color: COLORS.muted,
    fontSize: 11,
  },
  card: {
    gap: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  eyebrow: {
    color: '#92702A',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  empty: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  promise: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.xs,
  },
  promiseMark: {
    color: COLORS.secondary,
    fontSize: 19,
  },
  promiseText: {
    flex: 1,
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  primaryButton: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
  primaryArrow: {
    color: COLORS.secondary,
    fontSize: 22,
    lineHeight: 24,
  },
  pressed: {
    opacity: 0.75,
  },
});
