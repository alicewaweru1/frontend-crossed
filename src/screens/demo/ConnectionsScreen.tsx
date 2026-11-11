import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  DemoNotice,
  DemoScreenShell,
  InitialAvatar,
  Pill,
} from '../../components/DemoComponents';
import type { DemoStackParamList } from '../../navigation/types';
import { COLORS } from '../../theme/colors';
import { RADIUS, SPACING } from '../../theme/spacing';
import { CONNECTION_EXAMPLES, INTRODUCTIONS } from './demoData';

type Props = NativeStackScreenProps<DemoStackParamList, 'Connections'>;

export default function ConnectionsScreen({ navigation }: Props) {
  return (
    <DemoScreenShell
      title="Meaningful, by design."
      subtitle="A little room for curiosity, one considered introduction at a time."
      activeTab="Connections"
    >
      <DemoNotice>Illustrative connections</DemoNotice>
      <View style={styles.summary}>
        <Text style={styles.summaryNumber}>02</Text>
        <View style={styles.summaryCopy}>
          <Text style={styles.summaryTitle}>Stories with something in common</Text>
          <Text style={styles.summarySubtitle}>A considered alternative to endless scrolling.</Text>
        </View>
      </View>
      {CONNECTION_EXAMPLES.map((connection, index) => {
        const person = INTRODUCTIONS.find((item) => item.id === connection.id);
        if (!person) return null;

        return (
        <Pressable
          key={connection.id}
          style={styles.card}
          onPress={() => navigation.navigate('ProfilePreview', { profileId: person.id })}
          accessibilityRole="button"
          accessibilityLabel={`View profile for ${person.name}`}
        >
          <View style={styles.cardTop}>
            <InitialAvatar initials={person.initials} dark={index === 1} />
            <View style={styles.person}>
              <Text style={styles.personName}>{person.name}, {person.age}</Text>
              <Text style={styles.date}>{person.location}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </View>
          <Text style={styles.detail}>{connection.note}</Text>
          <Pill>ILLUSTRATIVE</Pill>
        </Pressable>
        );
      })}
      <Pressable
        style={styles.messageLink}
        onPress={() => navigation.navigate('MessagingInbox')}
        accessibilityRole="button"
      >
        <View style={styles.messageIcon}>
          <Text style={styles.messageIconText}>“</Text>
        </View>
        <View style={styles.messageCopy}>
          <Text style={styles.messageTitle}>A conversation, thoughtfully</Text>
          <Text style={styles.messageSubtitle}>See a short messaging preview</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </Pressable>
      <View style={styles.footerCard}>
        <Text style={styles.footerMark}>✳</Text>
        <Text style={styles.footerText}>
          Real connection takes time. Crossed makes space for it.
        </Text>
      </View>
    </DemoScreenShell>
  );
}

const styles = StyleSheet.create({
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
  },
  summaryNumber: {
    color: COLORS.secondary,
    fontSize: 34,
    fontWeight: '700',
  },
  summaryCopy: {
    gap: 4,
  },
  summaryTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  summarySubtitle: {
    color: '#D4E0D9',
    fontSize: 11,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    gap: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  person: {
    flex: 1,
    gap: 4,
  },
  personName: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '700',
  },
  date: {
    color: COLORS.muted,
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1,
  },
  arrow: {
    color: COLORS.primary,
    fontSize: 23,
  },
  detail: {
    color: COLORS.text,
    fontSize: 13,
    lineHeight: 19,
  },
  footerCard: {
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.lg,
  },
  footerMark: {
    color: COLORS.secondary,
    fontSize: 24,
  },
  footerText: {
    maxWidth: 240,
    textAlign: 'center',
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 19,
  },
  messageLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: '#E9EEE9',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
  },
  messageIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#D5E0D7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageIconText: {
    color: COLORS.primary,
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '700',
  },
  messageCopy: {
    flex: 1,
    gap: 4,
  },
  messageTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '700',
  },
  messageSubtitle: {
    color: COLORS.muted,
    fontSize: 11,
  },
});
