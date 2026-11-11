import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  DemoNotice,
  DemoScreenShell,
  InitialAvatar,
  Pill,
} from '../../components/DemoComponents';
import { COLORS } from '../../theme/colors';
import { RADIUS, SPACING } from '../../theme/spacing';
import { INTRODUCTIONS } from './demoData';
import type { DemoStackParamList } from '../../navigation/types';
import { useDemoProfile } from '../../context/DemoProfileContext';

type Props = NativeStackScreenProps<DemoStackParamList, 'FiveCrosses'>;

export default function FiveCrossesScreen({ navigation }: Props) {
  const { profile, avatar } = useDemoProfile();
  useEffect(() => {
    if (!profile.isComplete) {
      navigation.replace('ProfileSetup');
    } else if (!profile.discoveryComplete) {
      navigation.replace('DiscoveryIntro');
    }
  }, [navigation, profile.discoveryComplete, profile.isComplete]);

  if (!profile.isComplete || !profile.discoveryComplete) {
    return null;
  }

  const interestMatches = (profileInterests: string[], personInterests: string[]) => {
    const aliases: Record<string, string[]> = {
      'Books & ideas': ['book', 'poetry', 'film'],
      Hiking: ['hiking', 'trail', 'walk'],
      Cooking: ['cook', 'meal', 'food'],
      'Live music': ['jazz', 'soul', 'music', 'football'],
      'Art & design': ['architecture', 'ceramic', 'poetry', 'film'],
      Travel: ['travel', 'city'],
      Community: ['community', 'market', 'neighborhood'],
    };
    return profileInterests.filter((interest) =>
      (aliases[interest] ?? [interest.toLowerCase()]).some((term) =>
        personInterests.some((item) => item.toLowerCase().includes(term.toLowerCase())),
      ),
    );
  };
  const results = [...INTRODUCTIONS]
    .map((person) => {
      const interests = interestMatches(profile.interests, person.interests);
      const values = profile.values.filter((value) => person.values.includes(value));
      const lifestyle = profile.lifestyle.filter((value) => person.lifestyle.includes(value));
      const qualities = profile.qualities.filter((value) => person.qualities.includes(value));
      const score = interests.length * 3 + values.length * 2 + lifestyle.length * 2 + qualities.length;
      const reasons = [
        ...interests.map((value) => `Shared interest: ${value}`),
        ...values.map((value) => `A shared value: ${value}`),
        ...lifestyle.map((value) => `Similar pace: ${value}`),
        ...qualities.map((value) => `You value ${value.toLowerCase()}`),
      ];
      return { person, score, reasons };
    })
    .sort((left, right) => right.score - left.score);

  return (
    <DemoScreenShell
      title="Your Five Crosses."
      subtitle={`Five illustrative introductions, considered around ${avatar.name.split(' ')[0]}'s sample preferences.`}
      activeTab="FiveCrosses"
    >
      <View style={styles.resultsIntro}>
        <Text style={styles.resultsNumber}>05</Text>
        <View style={styles.resultsCopy}>
          <Text style={styles.resultsTitle}>Considered, not endless.</Text>
          <Text style={styles.resultsSubtitle}>Your selections shaped this illustrative set.</Text>
        </View>
      </View>
      <DemoNotice>Illustrative profiles</DemoNotice>
      {results.map(({ person, reasons }, index) => (
        <Pressable
          key={person.id}
          style={({ pressed }) => [styles.card, pressed && styles.pressed]}
          onPress={() => navigation.navigate('ProfilePreview', { profileId: person.id })}
          accessibilityRole="button"
          accessibilityLabel={`View ${person.name}'s illustrative profile`}
        >
          <View style={styles.cardHeader}>
            <InitialAvatar initials={person.initials} size={54} dark={index % 2 === 1} />
            <View style={styles.identity}>
              <Text style={styles.name}>{person.name}, {person.age}</Text>
              <Text style={styles.location}>{person.location}</Text>
            </View>
            <Text style={styles.crossMark}>✳</Text>
          </View>
          <Text style={styles.detail}>{person.introduction}</Text>
          <Text style={styles.reasonLabel}>A few reasons this story stood out</Text>
          <View style={styles.cardFooter}>
            {(reasons.length > 0 ? reasons.slice(0, 3) : ['A chance to discover a different perspective']).map((reason) => (
              <Pill key={reason}>{reason}</Pill>
            ))}
          </View>
          <Text style={styles.interestLabel}>A few things they enjoy</Text>
          <View style={styles.cardFooter}>
            {person.interests.map((interest) => (
              <Pill key={interest}>{interest}</Pill>
            ))}
          </View>
        </Pressable>
      ))}
    </DemoScreenShell>
  );
}

const styles = StyleSheet.create({
  resultsIntro: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.md,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
  },
  resultsNumber: {
    color: COLORS.secondary,
    fontSize: 34,
    fontWeight: '700',
  },
  resultsCopy: {
    flex: 1,
    gap: 4,
  },
  resultsTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  resultsSubtitle: {
    color: '#D4E0D9',
    fontSize: 11,
    lineHeight: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    gap: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pressed: {
    opacity: 0.78,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  identity: {
    flex: 1,
    gap: 5,
  },
  name: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '700',
  },
  location: {
    color: COLORS.muted,
    fontSize: 11,
  },
  crossMark: {
    color: COLORS.secondary,
    fontSize: 23,
  },
  detail: {
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 20,
  },
  reasonLabel: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
    marginBottom: -SPACING.sm,
  },
  interestLabel: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.9,
    marginBottom: -SPACING.sm,
  },
  cardFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
});
