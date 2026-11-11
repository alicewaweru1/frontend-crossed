import React, { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import {
  DemoNotice,
  DemoScreenShell,
} from '../../components/DemoComponents';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DemoStackParamList } from '../../navigation/types';
import { COLORS } from '../../theme/colors';
import { RADIUS, SPACING } from '../../theme/spacing';

type Props = NativeStackScreenProps<DemoStackParamList, 'Settings'>;

type SettingRowProps = {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

function SettingRow({
  title,
  description,
  value,
  onValueChange,
}: SettingRowProps) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingCopy}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#D9DFD9', true: '#8DA698' }}
        thumbColor={value ? COLORS.primary : '#F9FAF8'}
        accessibilityLabel={title}
      />
    </View>
  );
}

export default function SettingsScreen({ navigation }: Props) {
  const [updates, setUpdates] = useState(false);
  const [profileVisible, setProfileVisible] = useState(true);
  const [readReceipts, setReadReceipts] = useState(false);
  const [showSafetyGuidance, setShowSafetyGuidance] = useState(false);

  return (
    <DemoScreenShell
      title="Your space, your pace."
      subtitle="Thoughtful choices for a more considered experience."
      onBack={() => navigation.goBack()}
    >
      <DemoNotice>
        Your choices here are for display only.
      </DemoNotice>
      <View style={styles.group}>
        <Text style={styles.groupTitle}>PREFERENCES</Text>
        <SettingRow
          title="Product updates"
          description="Occasional notes about what’s new."
          value={updates}
          onValueChange={setUpdates}
        />
        <View style={styles.divider} />
        <SettingRow
          title="Profile visibility"
          description="Choose when your profile can be seen."
          value={profileVisible}
          onValueChange={setProfileVisible}
        />
        <View style={styles.divider} />
        <SettingRow
          title="Read receipts"
          description="Let a connection know when you’ve read a message."
          value={readReceipts}
          onValueChange={setReadReceipts}
        />
      </View>
      <View style={styles.group}>
        <Text style={styles.groupTitle}>PRIVACY & SAFETY</Text>
        <View style={styles.infoRow}>
          <View style={styles.infoCopy}>
            <Text style={styles.settingTitle}>Your information</Text>
            <Text style={styles.settingDescription}>
              Your details should always remain yours to share.
            </Text>
          </View>
          <Text style={styles.infoMark}>✓</Text>
        </View>
        <View style={styles.divider} />
        <Pressable
          style={styles.infoRow}
          onPress={() => setShowSafetyGuidance((visible) => !visible)}
          accessibilityRole="button"
          accessibilityState={{ expanded: showSafetyGuidance }}
        >
          <View style={styles.infoCopy}>
            <Text style={styles.settingTitle}>Safety comes first</Text>
            <Text style={styles.settingDescription}>
              Guidance for a respectful, thoughtful experience.
            </Text>
          </View>
          <Text style={styles.infoMark}>{showSafetyGuidance ? '−' : '+'}</Text>
        </Pressable>
        {showSafetyGuidance ? (
          <Text style={styles.guidance}>
            Take time to build trust, keep personal details private, and choose a public place if you meet someone in person.
          </Text>
        ) : null}
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerLogo}>CROSSED</Text>
        <Text style={styles.footerText}>Fewer profiles. Better connections.</Text>
        <Text style={styles.version}>A MORE THOUGHTFUL WAY TO MEET</Text>
      </View>
    </DemoScreenShell>
  );
}

const styles = StyleSheet.create({
  group: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
  },
  groupTitle: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.4,
    marginBottom: SPACING.xs,
  },
  settingRow: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  settingCopy: {
    flex: 1,
    gap: 4,
  },
  settingTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '700',
  },
  settingDescription: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
  },
  infoRow: {
    minHeight: 74,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.md,
  },
  infoCopy: {
    flex: 1,
    gap: 4,
  },
  infoMark: {
    color: COLORS.primary,
    fontSize: 19,
    fontWeight: '700',
  },
  guidance: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 17,
    paddingBottom: SPACING.md,
  },
  footer: {
    alignItems: 'center',
    gap: 5,
    paddingVertical: SPACING.xl,
  },
  footerLogo: {
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 2.5,
  },
  footerText: {
    color: COLORS.muted,
    fontSize: 11,
  },
  version: {
    color: COLORS.muted,
    fontSize: 8,
    letterSpacing: 1,
    marginTop: SPACING.sm,
  },
});
