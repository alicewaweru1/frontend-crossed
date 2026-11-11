import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  DemoScreenShell,
  InitialAvatar,
  SectionTitle,
} from '../../components/DemoComponents';
import type { DemoStackParamList } from '../../navigation/types';
import { FEATURED_INTRODUCTION } from './demoData';
import { COLORS } from '../../theme/colors';
import { RADIUS, SPACING } from '../../theme/spacing';
import { useDemoProfile } from '../../context/DemoProfileContext';

type Props = NativeStackScreenProps<DemoStackParamList, 'DemoHome'>;

export default function DemoHomeScreen({ navigation }: Props) {
  const { profile } = useDemoProfile();
  return (
    <DemoScreenShell
      title="Meet with intention."
      subtitle="A little less scrolling. A lot more meaning."
      activeTab="DemoHome"
    >
      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <Text style={styles.heroEyebrow}>THE CROSSED PHILOSOPHY</Text>
          <View style={styles.motif}>
            <View style={styles.motifVertical} />
            <View style={styles.motifHorizontal} />
          </View>
        </View>
        <Text style={styles.heroTitle}>
          Five thoughtful introductions. Room for something real.
        </Text>
        <Text style={styles.heroCopy}>
          Curated, not endless. Take your time getting to know each story.
        </Text>
        <Pressable
          onPress={() => navigation.navigate(profile.isComplete ? 'DiscoveryIntro' : 'ProfileSetup')}
          style={styles.heroButton}
          accessibilityRole="button"
        >
          <Text style={styles.heroButtonText}>
            {profile.isComplete ? 'Find My Five Crosses' : 'Shape your introduction'}
          </Text>
          <Text style={styles.heroArrow}>↗</Text>
        </Pressable>
      </View>

      <View style={styles.statRow}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>05</Text>
          <Text style={styles.statLabel}>thoughtful introductions</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statNumber}>01</Text>
          <Text style={styles.statLabel}>meaningful moment</Text>
        </View>
      </View>

      <SectionTitle
        title="One story, worth a pause"
        action="Meet Wanjiku"
        onAction={() => navigation.navigate('ProfilePreview', { profileId: FEATURED_INTRODUCTION.id })}
      />
      <Pressable
        style={styles.profileCard}
        onPress={() => navigation.navigate('ProfilePreview', { profileId: FEATURED_INTRODUCTION.id })}
        accessibilityRole="button"
      >
        <InitialAvatar initials={FEATURED_INTRODUCTION.initials} size={62} />
        <View style={styles.profileCopy}>
          <Text style={styles.profileName}>
            {FEATURED_INTRODUCTION.name}, {FEATURED_INTRODUCTION.age}
          </Text>
          <Text style={styles.profileDescription}>
            {FEATURED_INTRODUCTION.location}
          </Text>
          <Text style={styles.profilePrompt}>
            “{FEATURED_INTRODUCTION.prompt}”
          </Text>
        </View>
        <Text style={styles.profileArrow}>›</Text>
      </Pressable>

      <SectionTitle title="A more considered way to connect" />
      <Pressable
        style={styles.connectionsLink}
        onPress={() => navigation.navigate('Connections')}
        accessibilityRole="button"
      >
        <Text style={styles.connectionsIcon}>♡</Text>
        <View style={styles.connectionsCopy}>
          <Text style={styles.connectionsTitle}>A little more meaning, a little less noise</Text>
          <Text style={styles.connectionsDescription}>
            See how a thoughtful introduction could unfold.
          </Text>
        </View>
        <Text style={styles.profileArrow}>›</Text>
      </Pressable>
    </DemoScreenShell>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    gap: SPACING.md,
    overflow: 'hidden',
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroEyebrow: {
    color: '#D8C89F',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.8,
  },
  motif: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.85,
  },
  motifVertical: {
    position: 'absolute',
    width: 1,
    height: 34,
    backgroundColor: COLORS.secondary,
  },
  motifHorizontal: {
    position: 'absolute',
    height: 1,
    width: 34,
    backgroundColor: COLORS.secondary,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 25,
    lineHeight: 32,
    fontWeight: '700',
    letterSpacing: -0.3,
    maxWidth: 300,
  },
  heroCopy: {
    color: '#D4E0D9',
    fontSize: 13,
    lineHeight: 20,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.secondary,
    borderRadius: RADIUS.round,
    paddingHorizontal: SPACING.md,
    paddingVertical: 13,
    marginTop: SPACING.xs,
  },
  heroButtonText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '800',
  },
  heroArrow: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 17,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  statNumber: {
    color: COLORS.primary,
    fontSize: 23,
    fontWeight: '700',
  },
  statLabel: {
    color: COLORS.muted,
    fontSize: 10,
  },
  statDivider: {
    width: 1,
    height: 38,
    backgroundColor: COLORS.border,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
  },
  profileCopy: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },
  profileDescription: {
    color: COLORS.muted,
    fontSize: 11,
  },
  profilePrompt: {
    color: COLORS.primary,
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 3,
  },
  profileArrow: {
    color: COLORS.primary,
    fontSize: 24,
  },
  connectionsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: '#E9EEE9',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
  },
  connectionsIcon: {
    color: COLORS.primary,
    fontSize: 26,
  },
  connectionsCopy: {
    flex: 1,
    gap: 4,
  },
  connectionsTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '700',
  },
  connectionsDescription: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 16,
  },
});
