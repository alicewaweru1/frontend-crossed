import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { DemoScreenShell, InitialAvatar, Pill } from '../../components/DemoComponents';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DemoStackParamList } from '../../navigation/types';
import { COLORS } from '../../theme/colors';
import { RADIUS, SPACING } from '../../theme/spacing';
import { FEATURED_INTRODUCTION, INTRODUCTIONS } from './demoData';

const DEMO_MESSAGES = [
  {
    id: 'm1',
    sender: 'Wanjiku',
    avatar: 'WM',
    mine: false,
    text: 'I love a slow Sunday with a walk, good coffee, and time to actually listen.',
    time: '9:12 AM',
  },
  {
    id: 'm2',
    sender: 'You',
    avatar: 'Y',
    mine: true,
    text: 'That sounds like a beautiful way to start the week. What kind of coffee do you usually go for?',
    time: '9:14 AM',
  },
  {
    id: 'm3',
    sender: 'Wanjiku',
    avatar: 'WM',
    mine: false,
    text: 'Something light and warm, honestly. I keep coming back to places with a window seat and good playlists.',
    time: '9:15 AM',
  },
  {
    id: 'm4',
    sender: 'You',
    avatar: 'Y',
    mine: true,
    text: 'That feels very us. I love the idea of a conversation that leaves room for the unexpected.',
    time: '9:17 AM',
  },
];

const PROMPTS = [
  'What is something you could talk about for hours?',
  'What does a meaningful weekend look like to you?',
  'What is a value you never compromise on?',
];

type Props = NativeStackScreenProps<DemoStackParamList, 'Messaging'>;

export default function MessagingScreen({ navigation, route }: Props) {
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const profile = INTRODUCTIONS.find(
    (person) => person.id === route.params?.profileId,
  ) ?? FEATURED_INTRODUCTION;

  const activePrompt = PROMPTS[activePromptIndex];

  const sendMessage = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: `m${Date.now()}`,
        sender: 'You',
        avatar: 'Y',
        mine: true,
        text: trimmed,
        time: 'Now',
      },
    ]);
    setDraft('');
  };

  return (
    <DemoScreenShell
      title="Thoughtful conversation."
      subtitle="A considered conversation, kept within this illustrative experience."
      activeTab="Messaging"
      onBack={() => navigation.goBack()}
    >
      <View style={styles.promptWrap}>
        <Text style={styles.promptLabel}>PROMPT</Text>
        <Text style={styles.promptText}>{activePrompt}</Text>
        <View style={styles.promptRow}>
          {PROMPTS.map((prompt, index) => (
            <Pressable
              key={prompt}
              onPress={() => setActivePromptIndex(index)}
              accessibilityRole="button"
            >
              <Pill>{prompt}</Pill>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.chatCard}>
        <View style={styles.chatHeader}>
          <View style={styles.chatIdentity}>
            <InitialAvatar initials={profile.initials} size={42} />
            <View>
              <Text style={styles.chatName}>{profile.name}</Text>
              <Text style={styles.chatStatus}>Illustrative conversation</Text>
            </View>
          </View>
          <Text style={styles.online}>PREVIEW</Text>
        </View>

        <View style={styles.messagesList}>
          {messages.map((item) => (
            <View
              key={item.id}
              style={[
                styles.messageRow,
                item.mine ? styles.messageRowMine : styles.messageRowOther,
              ]}
            >
              {!item.mine ? (
                <InitialAvatar initials={profile.initials} size={28} />
              ) : null}
              <View
                style={[
                  styles.bubble,
                  item.mine ? styles.bubbleMine : styles.bubbleOther,
                ]}
              >
                <Text style={item.mine ? styles.messageTextMine : styles.messageTextOther}>{item.text}</Text>
                <Text style={item.mine ? styles.timeMine : styles.timeOther}>{item.time}</Text>
              </View>
            </View>
          ))}
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={90}
        >
          <View style={styles.inputBar}>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="Send a thoughtful reply..."
              placeholderTextColor={COLORS.muted}
              style={styles.input}
              multiline
            />
            <Pressable
              onPress={sendMessage}
              disabled={!draft.trim()}
              style={({ pressed }) => [
                styles.sendButton,
                !draft.trim() && styles.sendButtonDisabled,
                pressed && styles.sendButtonPressed,
              ]}
              accessibilityRole="button"
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </DemoScreenShell>
  );
}

const styles = StyleSheet.create({
  promptWrap: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  promptLabel: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  promptText: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
  promptRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  chatCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: '#F5F7F4',
  },
  chatIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  chatName: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '700',
  },
  chatStatus: {
    color: COLORS.muted,
    fontSize: 10,
  },
  online: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  messagesList: {
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: SPACING.sm,
  },
  messageRowMine: {
    justifyContent: 'flex-end',
  },
  messageRowOther: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '78%',
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  bubbleMine: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 6,
  },
  bubbleOther: {
    backgroundColor: '#EDF1EC',
    borderBottomLeftRadius: 6,
  },
  messageTextMine: {
    color: COLORS.white,
    fontSize: 12,
    lineHeight: 18,
  },
  messageTextOther: {
    color: COLORS.text,
    fontSize: 12,
    lineHeight: 18,
  },
  timeMine: {
    color: '#D8E4DA',
    fontSize: 9,
    marginTop: 2,
    textAlign: 'right',
  },
  timeOther: {
    color: COLORS.muted,
    fontSize: 9,
    marginTop: 2,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: SPACING.sm,
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: '#F9FAF6',
  },
  input: {
    flex: 1,
    minHeight: 46,
    maxHeight: 120,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    color: COLORS.text,
    fontSize: 13,
  },
  sendButton: {
    minWidth: 74,
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.secondary,
  },
  sendButtonDisabled: {
    opacity: 0.45,
  },
  sendButtonPressed: {
    opacity: 0.85,
  },
  sendButtonText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
  },
});
