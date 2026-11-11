import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  DemoScreenShell,
  InitialAvatar,
  Pill,
  SectionTitle,
} from '../../components/DemoComponents';
import type { DemoStackParamList } from '../../navigation/types';
import { COLORS } from '../../theme/colors';
import { RADIUS, SPACING } from '../../theme/spacing';
import { FEATURED_INTRODUCTION, INTRODUCTIONS } from './demoData';
import { useDemoProfile } from '../../context/DemoProfileContext';
import { useLocalConversations } from '../../context/LocalConversationsContext';

type Props = NativeStackScreenProps<DemoStackParamList, 'ProfilePreview'>;

export default function ProfilePreviewScreen({ route, navigation }: Props) {
  const { profile: sampleProfile, avatar } = useDemoProfile();
  const { openConversation } = useLocalConversations();
  const isOwnPreview = !route.params?.profileId;
  const sample = INTRODUCTIONS.find((person) => person.id === route.params?.profileId);
  const profile = sample ?? FEATURED_INTRODUCTION;
  const name = isOwnPreview ? avatar.name : profile.name;
  const initials = isOwnPreview ? avatar.initials : profile.initials;
  const interests = isOwnPreview ? sampleProfile.interests : profile.interests;
  const values = isOwnPreview ? sampleProfile.values : profile.values;
  const lifestyle = isOwnPreview ? sampleProfile.lifestyle : profile.lifestyle;
  const qualities = isOwnPreview ? sampleProfile.qualities : profile.qualities;

  return (
    <DemoScreenShell
      title={isOwnPreview ? 'A profile with intention.' : `Meet ${name.split(' ')[0]}.`}
      subtitle={isOwnPreview
        ? 'Your fictional profile, shaped by the choices in this preview.'
        : 'A thoughtful introduction, with space for the details.'}
      activeTab="ProfilePreview"
    >
      <View style={styles.hero}>
        <View style={styles.heroArt}>
          <View style={styles.sun} />
          <View style={styles.horizon} />
          {isOwnPreview ? (
            <View style={[styles.ownAvatar, { backgroundColor: avatar.background }]}>
              <Text style={[styles.ownAvatarSymbol, { color: avatar.foreground }]}>{avatar.symbol}</Text>
              <Text style={[styles.ownAvatarInitials, { color: avatar.foreground }]}>{avatar.initials}</Text>
            </View>
          ) : (
            <InitialAvatar initials={initials} size={98} />
          )}
        </View>
        <View style={styles.nameBlock}>
          <Text style={styles.name}>{isOwnPreview ? name : `${name}, ${profile.age}`}</Text>
          <Text style={styles.location}>{isOwnPreview ? 'An illustrative sample profile' : profile.location}</Text>
          <Text style={styles.illustrative}>ILLUSTRATIVE PROFILE</Text>
        </View>
        <View style={styles.profileBody}>
          <SectionTitle title="A little more" />
          <Text style={styles.bio}>
            {isOwnPreview
              ? `A ${sampleProfile.lifestyle[0]?.toLowerCase() ?? 'thoughtful'} spirit, with room for a meaningful connection.`
              : profile.introduction}
          </Text>
          <SectionTitle title="The things I love" />
          <View style={styles.pills}>
            {interests.map((interest) => (
              <Pill key={interest}>{interest}</Pill>
            ))}
          </View>
          <SectionTitle title="Values that guide me" />
          <View style={styles.pills}>
            {values.map((value) => <Pill key={value}>{value}</Pill>)}
          </View>
          <SectionTitle title="My kind of rhythm" />
          <View style={styles.pills}>
            {lifestyle.map((item) => <Pill key={item}>{item}</Pill>)}
          </View>
          <SectionTitle title="What I value in a connection" />
          <View style={styles.pills}>
            {qualities.map((item) => <Pill key={item}>{item}</Pill>)}
          </View>
          {!isOwnPreview ? (
            <>
              <View style={styles.promptCard}>
                <Text style={styles.promptLabel}>A QUESTION WORTH ASKING</Text>
                <Text style={styles.prompt}>“{profile.prompt}”</Text>
                <Text style={styles.response}>{profile.response}</Text>
              </View>
              <Pressable
                onPress={() => {
                  openConversation(profile);
                  navigation.navigate('Messaging', { profileId: profile.id });
                }}
                style={({ pressed }) => [styles.messageButton, pressed && styles.pressed]}
                accessibilityRole="button"
                accessibilityLabel={`Message ${profile.name}`}
              >
                <Text style={styles.messageIcon}>✉</Text>
                <Text style={styles.messageButtonText}>Message</Text>
              </Pressable>
            </>
          ) : (
            <Pressable
              onPress={() => navigation.navigate('ProfileSetup')}
              style={({ pressed }) => [styles.editButton, pressed && styles.pressed]}
              accessibilityRole="button"
            >
              <Text style={styles.editButtonText}>Edit this sample profile</Text>
            </Pressable>
          )}
        </View>
      </View>
    </DemoScreenShell>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  heroArt: {
    height: 176,
    backgroundColor: '#D8E2D9',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sun: {
    position: 'absolute',
    width: 118,
    height: 118,
    borderRadius: 59,
    right: 28,
    top: 18,
    backgroundColor: '#E8AE3A',
    opacity: 0.7,
  },
  horizon: {
    position: 'absolute',
    left: -20,
    right: -20,
    bottom: -34,
    height: 88,
    borderRadius: 100,
    backgroundColor: '#8AA292',
  },
  nameBlock: {
    padding: SPACING.lg,
    paddingBottom: 0,
    gap: 5,
  },
  name: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '700',
  },
  location: {
    color: COLORS.muted,
    fontSize: 12,
  },
  illustrative: {
    color: COLORS.muted,
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginTop: 4,
  },
  profileBody: {
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  bio: {
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 23,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  promptCard: {
    backgroundColor: '#F7F1E5',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    gap: SPACING.sm,
  },
  ownAvatar: {
    width: 98,
    height: 98,
    borderRadius: 49,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#F6EDE0',
  },
  ownAvatarSymbol: {
    position: 'absolute',
    top: 10,
    right: 12,
    fontSize: 20,
  },
  ownAvatarInitials: {
    fontSize: 24,
    fontWeight: '800',
  },
  editButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
    backgroundColor: '#EDF2EC',
  },
  editButtonText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  messageButton: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    marginTop: SPACING.xs,
  },
  messageIcon: {
    color: COLORS.secondary,
    fontSize: 17,
  },
  messageButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.75,
  },
  promptLabel: {
    color: '#83652B',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  prompt: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 23,
  },
  response: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 20,
  },
});
