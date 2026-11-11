import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { DemoStackParamList } from '../navigation/types';
import { useDemoProfile } from '../context/DemoProfileContext';
import { COLORS } from '../theme/colors';
import { RADIUS, SPACING } from '../theme/spacing';

type DemoTabRoute = 'DemoHome' | 'FiveCrosses' | 'Connections' | 'MessagingInbox' | 'Messaging' | 'ProfilePreview';

const TABS: { route: DemoTabRoute; label: string; icon: string }[] = [
  { route: 'DemoHome', label: 'Home', icon: '⌂' },
  { route: 'FiveCrosses', label: 'Five Crosses', icon: '✳' },
  { route: 'Connections', label: 'Connections', icon: '♡' },
  { route: 'MessagingInbox', label: 'Messaging', icon: '✉' },
  { route: 'ProfilePreview', label: 'Profile', icon: '◉' },
];

type ShellProps = {
  title: string;
  subtitle: string;
  activeTab?: DemoTabRoute;
  onBack?: () => void;
  hideBottomTabs?: boolean;
  children: React.ReactNode;
};

function SettingsGlyph() {
  return (
    <View style={styles.gear} accessibilityElementsHidden>
      <View style={styles.gearOuter}>
        <View style={styles.gearInner} />
      </View>
      <View style={[styles.gearTooth, styles.gearTop]} />
      <View style={[styles.gearTooth, styles.gearBottom]} />
      <View style={[styles.gearTooth, styles.gearLeft]} />
      <View style={[styles.gearTooth, styles.gearRight]} />
    </View>
  );
}

export function DemoScreenShell({
  title,
  subtitle,
  activeTab,
  onBack,
  hideBottomTabs = false,
  children,
}: ShellProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<DemoStackParamList>>();
  const { profile } = useDemoProfile();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <Text style={styles.wordmark}>CROSSED</Text>
        <View style={styles.headerActions}>
          {onBack ? (
            <Pressable
              onPress={onBack}
              style={({ pressed }) => [styles.backAction, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Text style={styles.backArrow}>‹</Text>
              <Text style={styles.backLabel}>Back</Text>
            </Pressable>
          ) : null}
          <Pressable
            onPress={() => navigation.navigate('Settings')}
            style={({ pressed }) => [styles.settingsAction, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Settings"
            hitSlop={8}
          >
            <SettingsGlyph />
            <Text style={styles.settingsLabel}>Settings</Text>
          </Pressable>
        </View>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>{title}</Text>
        <Text style={styles.pageSubtitle}>{subtitle}</Text>
        {children}
      </ScrollView>
      {!hideBottomTabs && profile.isComplete ? (
      <View style={styles.tabBar}>
        {TABS.map((tab) => {
          const isActive =
            activeTab === tab.route ||
            (activeTab === 'Messaging' && tab.route === 'MessagingInbox');
          return (
            <Pressable
              key={tab.route}
              onPress={() => {
                switch (tab.route) {
                  case 'DemoHome':
                    navigation.navigate('DemoHome');
                    break;
                  case 'FiveCrosses':
                    navigation.navigate('FiveCrosses');
                    break;
                  case 'Connections':
                    navigation.navigate('Connections');
                    break;
                  case 'MessagingInbox':
                    navigation.navigate('MessagingInbox');
                    break;
                  case 'ProfilePreview':
                    navigation.navigate('ProfilePreview');
                    break;
                }
              }}
              style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel={tab.label}
              accessibilityState={{ selected: isActive }}
            >
              <View style={styles.tabIconWrap}>
                <Text style={[styles.tabIcon, isActive && styles.activeTabText]}>
                  {tab.icon}
                </Text>
              </View>
              <Text
                numberOfLines={1}
                style={[styles.tabLabel, isActive && styles.activeTabText]}
              >
                {tab.label}
              </Text>
              {isActive ? <View style={styles.tabIndicator} /> : null}
            </Pressable>
          );
        })}
      </View>
      ) : null}
    </SafeAreaView>
  );
}

type ActionCardProps = {
  title: string;
  description?: string;
  onPress?: () => void;
  accessory?: string;
};

export function ActionCard({
  title,
  description,
  onPress,
  accessory = '›',
}: ActionCardProps) {
  const content = (
    <>
      <View style={styles.actionCopy}>
        <Text style={styles.actionTitle}>{title}</Text>
        {description ? (
          <Text style={styles.actionDescription}>{description}</Text>
        ) : null}
      </View>
      <Text style={styles.actionAccessory}>{accessory}</Text>
    </>
  );

  if (!onPress) {
    return <View style={styles.actionCard}>{content}</View>;
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.actionCard, pressed && styles.pressed]}
      onPress={onPress}
      accessibilityRole="button"
    >
      {content}
    </Pressable>
  );
}

type SectionTitleProps = {
  title: string;
  action?: string;
  onAction?: () => void;
};

export function SectionTitle({ title, action, onAction }: SectionTitleProps) {
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && onAction ? (
        <Pressable
          onPress={onAction}
          accessibilityRole="button"
          style={({ pressed }) => pressed && styles.pressed}
        >
          <Text style={styles.sectionAction}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function InitialAvatar({
  initials,
  size = 56,
  dark = false,
}: {
  initials: string;
  size?: number;
  dark?: boolean;
}) {
  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2 },
        dark && styles.darkAvatar,
      ]}
      accessibilityElementsHidden
    >
      <Text style={[styles.avatarText, { fontSize: size * 0.32 }]}>
        {initials}
      </Text>
    </View>
  );
}

export function DemoNotice({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.notice}>
      <View style={styles.noticeMark} />
      <Text style={styles.noticeText}>{children}</Text>
    </View>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBar: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    height: 56,
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wordmark: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 3,
  },
  settingsAction: {
    minWidth: 96,
    height: 42,
    paddingHorizontal: 10,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  settingsLabel: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  gear: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gearOuter: {
    width: 14,
    height: 14,
    borderWidth: 1.7,
    borderColor: COLORS.primary,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gearInner: {
    width: 4,
    height: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  gearTooth: {
    position: 'absolute',
    width: 2,
    height: 5,
    borderRadius: 1,
    backgroundColor: COLORS.primary,
  },
  gearTop: { top: 0 },
  gearBottom: { bottom: 0 },
  gearLeft: { left: 0, transform: [{ rotate: '90deg' }] },
  gearRight: { right: 0, transform: [{ rotate: '90deg' }] },
  backAction: {
    minWidth: 60,
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 2,
  },
  backArrow: {
    color: COLORS.primary,
    fontSize: 28,
    lineHeight: 30,
  },
  backLabel: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xl,
    gap: SPACING.md,
  },
  pageTitle: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.8,
  },
  pageSubtitle: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: -10,
    marginBottom: SPACING.sm,
  },
  tabBar: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    backgroundColor: COLORS.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
    paddingHorizontal: SPACING.xs,
    paddingBottom: 12,
    paddingTop: 8,
    minHeight: 78,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingHorizontal: 2,
    position: 'relative',
    minWidth: 0,
  },
  tabIconWrap: {
    minWidth: 36,
    height: 29,
    borderRadius: RADIUS.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    color: COLORS.muted,
    fontSize: 18,
    lineHeight: 22,
  },
  tabLabel: {
    color: COLORS.muted,
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  tabIndicator: {
    position: 'absolute',
    top: 0,
    width: 26,
    height: 3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: COLORS.secondary,
  },
  actionCard: {
    minHeight: 72,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionCopy: {
    flex: 1,
    gap: 4,
  },
  actionTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '700',
  },
  actionDescription: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 17,
  },
  actionAccessory: {
    color: COLORS.primary,
    fontSize: 23,
    paddingLeft: SPACING.sm,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
    marginBottom: -SPACING.sm,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '700',
  },
  sectionAction: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7D7BD',
    borderWidth: 3,
    borderColor: '#F6EDE0',
  },
  darkAvatar: {
    backgroundColor: '#385B4B',
    borderColor: '#5D796A',
  },
  avatarText: {
    color: COLORS.primary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: '#EDF1EC',
    borderRadius: RADIUS.md,
  },
  noticeMark: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.secondary,
  },
  noticeText: {
    color: COLORS.muted,
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
  },
  pill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.round,
    backgroundColor: '#F7EEDC',
  },
  pillText: {
    color: '#76561D',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  pressed: {
    opacity: 0.72,
  },
});
