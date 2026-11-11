import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { DemoScreenShell } from '../../components/DemoComponents';
import {
  CONNECTION_QUALITY_OPTIONS,
  DEMO_AVATARS,
  INTEREST_OPTIONS,
  LIFESTYLE_OPTIONS,
  VALUE_OPTIONS,
  useDemoProfile,
} from '../../context/DemoProfileContext';
import type { DemoStackParamList } from '../../navigation/types';
import { COLORS } from '../../theme/colors';
import { RADIUS, SPACING } from '../../theme/spacing';

type Props = NativeStackScreenProps<DemoStackParamList, 'ProfileSetup'>;

const STEPS = [
  { title: 'A name and a point of view.', subtitle: 'Choose a fictional profile to shape this preview.' },
  { title: 'What draws you in?', subtitle: 'Choose interests and values that feel meaningful.' },
  { title: 'What feels like your kind of life?', subtitle: 'Set the pace and qualities you value in a connection.' },
];

function ChoiceGrid({
  choices,
  selected,
  onToggle,
}: {
  choices: string[];
  selected: string[];
  onToggle: (choice: string) => void;
}) {
  return (
    <View style={styles.choiceGrid}>
      {choices.map((choice) => {
        const isSelected = selected.includes(choice);
        return (
          <Pressable
            key={choice}
            onPress={() => onToggle(choice)}
            style={({ pressed }) => [
              styles.choice,
              isSelected && styles.choiceSelected,
              pressed && styles.pressed,
            ]}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: isSelected }}
          >
            <Text style={[styles.choiceText, isSelected && styles.choiceTextSelected]}>{choice}</Text>
            <Text style={[styles.choiceMark, isSelected && styles.choiceTextSelected]}>{isSelected ? '✓' : '+'}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function ProfileSetupScreen({ navigation }: Props) {
  const { profile, avatar, updateProfile } = useDemoProfile();
  const [step, setStep] = useState(0);
  const currentStep = STEPS[step];

  const toggleSelection = (
    key: 'interests' | 'values' | 'lifestyle' | 'qualities',
    choice: string,
  ) => {
    const current = profile[key];
    updateProfile({
      [key]: current.includes(choice)
        ? current.filter((item) => item !== choice)
        : [...current, choice],
    });
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((current) => current - 1);
      return;
    }
    navigation.goBack();
  };

  const handleContinue = () => {
    if (step < STEPS.length - 1) {
      setStep((current) => current + 1);
      return;
    }
    updateProfile({ isComplete: true });
    navigation.navigate('DiscoveryIntro');
  };

  return (
    <DemoScreenShell
      title="Your Crossed profile."
      subtitle="A few thoughtful choices shape this illustrative experience."
      activeTab="FiveCrosses"
    >
      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>PROFILE SETUP</Text>
        <Text style={styles.progressCount}>{step + 1} OF {STEPS.length}</Text>
      </View>
      <View style={styles.progressTrack}>
        {STEPS.map((item, index) => (
          <View
            key={item.title}
            style={[styles.progressSegment, index <= step && styles.progressSegmentActive]}
          />
        ))}
      </View>
      <View style={styles.stepIntro}>
        <Text style={styles.stepTitle}>{currentStep.title}</Text>
        <Text style={styles.stepSubtitle}>{currentStep.subtitle}</Text>
      </View>

      {step === 0 ? (
        <View style={styles.sectionCard}>
          <Text style={styles.sectionEyebrow}>ILLUSTRATIVE PROFILE</Text>
          <Text style={styles.sectionTitle}>Choose a sample identity</Text>
          <View style={styles.avatarGrid}>
            {DEMO_AVATARS.map((option) => {
              const selected = profile.avatarId === option.id;
              return (
                <Pressable
                  key={option.id}
                  onPress={() => updateProfile({ avatarId: option.id })}
                  style={({ pressed }) => [
                    styles.avatarChoice,
                    selected && styles.avatarChoiceSelected,
                    pressed && styles.pressed,
                  ]}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  accessibilityLabel={`Choose ${option.name} illustration`}
                >
                  <View style={[styles.avatarArtwork, { backgroundColor: option.background }]}>
                    <Text style={[styles.avatarSymbol, { color: option.foreground }]}>{option.symbol}</Text>
                    <Text style={[styles.avatarInitials, { color: option.foreground }]}>{option.initials}</Text>
                  </View>
                  <Text style={styles.avatarName}>{option.name}</Text>
                  {selected ? <Text style={styles.selectedLabel}>SELECTED</Text> : <Text style={styles.selectedLabel}>SAMPLE</Text>}
                </Pressable>
              );
            })}
          </View>
          <View style={styles.currentIdentity}>
            <View style={[styles.miniAvatar, { backgroundColor: avatar.background }]}>
              <Text style={{ color: avatar.foreground, fontWeight: '800' }}>{avatar.initials}</Text>
            </View>
            <Text style={styles.currentIdentityText}>Your preview profile: <Text style={styles.currentName}>{avatar.name}</Text></Text>
          </View>
        </View>
      ) : null}

      {step === 1 ? (
        <>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionEyebrow}>INTERESTS & HOBBIES</Text>
            <Text style={styles.sectionTitle}>The things you enjoy</Text>
            <ChoiceGrid
              choices={INTEREST_OPTIONS}
              selected={profile.interests}
              onToggle={(choice) => toggleSelection('interests', choice)}
            />
          </View>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionEyebrow}>PERSONAL VALUES</Text>
            <Text style={styles.sectionTitle}>What matters to you</Text>
            <ChoiceGrid
              choices={VALUE_OPTIONS}
              selected={profile.values}
              onToggle={(choice) => toggleSelection('values', choice)}
            />
          </View>
        </>
      ) : null}

      {step === 2 ? (
        <>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionEyebrow}>LIFESTYLE</Text>
            <Text style={styles.sectionTitle}>Your kind of rhythm</Text>
            <ChoiceGrid
              choices={LIFESTYLE_OPTIONS}
              selected={profile.lifestyle}
              onToggle={(choice) => toggleSelection('lifestyle', choice)}
            />
          </View>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionEyebrow}>A MEANINGFUL CONNECTION</Text>
            <Text style={styles.sectionTitle}>Qualities you appreciate</Text>
            <ChoiceGrid
              choices={CONNECTION_QUALITY_OPTIONS}
              selected={profile.qualities}
              onToggle={(choice) => toggleSelection('qualities', choice)}
            />
          </View>
        </>
      ) : null}

      <View style={styles.footer}>
        <Pressable
          onPress={handleBack}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          accessibilityRole="button"
        >
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Pressable
          onPress={handleContinue}
          style={({ pressed }) => [styles.continueButton, pressed && styles.continuePressed]}
          accessibilityRole="button"
        >
          <Text style={styles.continueText}>{step === STEPS.length - 1 ? 'Review my profile' : 'Continue'}</Text>
          <Text style={styles.continueArrow}>›</Text>
        </Pressable>
      </View>
      <Text style={styles.localNote}>A fictional profile, created for this experience.</Text>
    </DemoScreenShell>
  );
}

const styles = StyleSheet.create({
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    color: COLORS.primary,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  progressCount: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  progressTrack: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginTop: -SPACING.sm,
  },
  progressSegment: {
    height: 4,
    flex: 1,
    borderRadius: RADIUS.round,
    backgroundColor: '#DDE3DC',
  },
  progressSegmentActive: {
    backgroundColor: COLORS.primary,
  },
  stepIntro: {
    gap: SPACING.xs,
    marginTop: SPACING.xs,
  },
  stepTitle: {
    color: COLORS.text,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  stepSubtitle: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 19,
  },
  sectionCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    gap: SPACING.md,
  },
  sectionEyebrow: {
    color: '#92702A',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  avatarChoice: {
    width: '48%',
    minHeight: 144,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: '#FBFCF9',
  },
  avatarChoiceSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#F1F5F0',
  },
  avatarArtwork: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarSymbol: {
    position: 'absolute',
    top: 5,
    right: 8,
    fontSize: 18,
  },
  avatarInitials: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  avatarName: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  selectedLabel: {
    color: COLORS.muted,
    fontSize: 8,
    letterSpacing: 1,
    fontWeight: '800',
  },
  currentIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
  },
  miniAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentIdentityText: {
    flex: 1,
    color: COLORS.muted,
    fontSize: 11,
  },
  currentName: {
    color: COLORS.text,
    fontWeight: '700',
  },
  choiceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  choice: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: '#F7F8F5',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  choiceSelected: {
    backgroundColor: '#E8EFE9',
    borderColor: '#92AA9A',
  },
  choiceText: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: '600',
  },
  choiceTextSelected: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  choiceMark: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  backButton: {
    minWidth: 78,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  backText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  continueButton: {
    flex: 1,
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
  },
  continuePressed: {
    opacity: 0.8,
  },
  continueText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
  },
  continueArrow: {
    color: COLORS.secondary,
    fontSize: 21,
    lineHeight: 22,
  },
  localNote: {
    color: COLORS.muted,
    fontSize: 10,
    textAlign: 'center',
    marginTop: -SPACING.sm,
  },
  pressed: {
    opacity: 0.75,
  },
});
