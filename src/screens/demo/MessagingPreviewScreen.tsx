import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  DemoNotice,
  DemoScreenShell,
  InitialAvatar,
} from '../../components/DemoComponents';
import { MESSAGE_EXAMPLES, INTRODUCTIONS } from './demoData';
import { COLORS } from '../../theme/colors';
import { RADIUS, SPACING } from '../../theme/spacing';

export default function MessagingPreviewScreen() {
  return (
    <DemoScreenShell
      title="Words worth sharing."
      subtitle="Good conversation begins with a little curiosity."
      activeTab="Connections"
    >
      <DemoNotice>Conversation preview · messages aren’t live</DemoNotice>
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>A few thoughtful openers</Text>
      </View>
      {MESSAGE_EXAMPLES.map((message, index) => {
        const person = INTRODUCTIONS.find((item) => item.id === message.id);
        if (!person) return null;

        return (
        <View key={message.id} style={styles.thread}>
          <InitialAvatar initials={person.initials} size={52} dark={index === 1} />
          <View style={styles.threadCopy}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{person.name}</Text>
              <Text style={styles.sample}>EXAMPLE</Text>
            </View>
            <View style={styles.messageBubble}>
              <Text style={styles.preview} numberOfLines={3}>{message.preview}</Text>
            </View>
          </View>
        </View>
        );
      })}
      <Text style={styles.disclaimer}>
        A glimpse of the conversations Crossed hopes to inspire.
      </Text>
    </DemoScreenShell>
  );
}

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
  },
  listTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },
  thread: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
  },
  threadCopy: {
    flex: 1,
    gap: SPACING.sm,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  name: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '700',
  },
  sample: {
    color: '#806222',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  messageBubble: {
    backgroundColor: '#EFF2EE',
    borderTopRightRadius: RADIUS.md,
    borderBottomRightRadius: RADIUS.md,
    borderBottomLeftRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  preview: {
    color: COLORS.text,
    fontSize: 12,
    lineHeight: 18,
  },
  disclaimer: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.sm,
  },
});
