import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  DemoNotice,
  DemoScreenShell,
  InitialAvatar,
} from '../../components/DemoComponents';
import type { DemoStackParamList } from '../../navigation/types';
import { COLORS } from '../../theme/colors';
import { RADIUS, SPACING } from '../../theme/spacing';
import { INTRODUCTIONS, MESSAGE_EXAMPLES } from './demoData';

type Props = NativeStackScreenProps<DemoStackParamList, 'MessagingInbox'>;

export default function MessagingInboxScreen({ navigation }: Props) {
  return (
    <DemoScreenShell
      title="Conversations."
      subtitle="A little space for the stories that keep unfolding."
      activeTab="MessagingInbox"
    >
      <DemoNotice>Illustrative conversations</DemoNotice>
      <View style={styles.inbox}>
        {MESSAGE_EXAMPLES.map((message, index) => {
          const person = INTRODUCTIONS.find((item) => item.id === message.id);
          if (!person) {
            return null;
          }

          return (
            <Pressable
              key={message.id}
              onPress={() => navigation.navigate('Messaging', { profileId: person.id })}
              style={({ pressed }) => [styles.thread, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel={`Open illustrative conversation with ${person.name}`}
            >
              <InitialAvatar initials={person.initials} size={50} dark={index === 1} />
              <View style={styles.threadContent}>
                <View style={styles.nameLine}>
                  <Text style={styles.name}>{person.name}</Text>
                  <Text style={styles.time}>{['9:17 AM', 'Yesterday', 'Mon'][index]}</Text>
                </View>
                <Text style={styles.preview} numberOfLines={2}>{message.preview}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          );
        })}
      </View>
    </DemoScreenShell>
  );
}

const styles = StyleSheet.create({
  inbox: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  thread: {
    minHeight: 82,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  threadContent: {
    flex: 1,
    gap: 5,
  },
  nameLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  name: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '700',
  },
  time: {
    color: COLORS.muted,
    fontSize: 9,
  },
  preview: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 16,
  },
  chevron: {
    color: COLORS.primary,
    fontSize: 23,
  },
  pressed: {
    backgroundColor: '#F3F6F2',
  },
});
