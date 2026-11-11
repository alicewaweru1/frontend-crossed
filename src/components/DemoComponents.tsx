import React, { useEffect, useState } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { DemoStackParamList } from '../navigation/types';
import { useDemoProfile } from '../context/DemoProfileContext';
import { COLORS } from '../theme/colors';
import { RADIUS, SPACING } from '../theme/spacing';

type DemoTabRoute = 'DemoHome' | 'FiveCrosses' | 'Connections' | 'MessagingInbox' | 'Messaging' | 'ProfilePreview';
const WEB_BADGE_CLEARANCE = 88;
const SIDEBAR_WIDTH = 232;
const DRAWER_WIDTH = 288;
const MOBILE_BREAKPOINT = 760;

const NAV_ITEMS: {
  route: 'DemoHome' | 'FiveCrosses' | 'Connections' | 'MessagingInbox' | 'ProfilePreview' | 'Settings';
  section: DemoTabRoute | 'Settings';
  label: string;
  icon: string;
}[] = [
  { route: 'DemoHome', section: 'DemoHome', label: 'Home', icon: '⌂' },
  { route: 'FiveCrosses', section: 'FiveCrosses', label: 'Five Crosses', icon: '✳' },
  { route: 'Connections', section: 'Connections', label: 'Connections', icon: '♡' },
  { route: 'MessagingInbox', section: 'MessagingInbox', label: 'Messaging', icon: '✉' },
  { route: 'ProfilePreview', section: 'ProfilePreview', label: 'Profile', icon: '◉' },
  { route: 'Settings', section: 'Settings', label: 'Settings', icon: '⚙' },
];

type ShellProps = {
  title: string;
  subtitle: string;
  activeTab?: DemoTabRoute | 'Settings';
  onBack?: () => void;
  children: React.ReactNode;
};

export function DemoScreenShell({
  title,
  subtitle,
  activeTab,
  onBack,
  children,
}: ShellProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<DemoStackParamList>>();
  const { profile } = useDemoProfile();
  const { width } = useWindowDimensions();
  const isMobile = width < MOBILE_BREAKPOINT;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);
  const [drawerTranslateX] = useState(() => new Animated.Value(-DRAWER_WIDTH));

  useEffect(() => {
    if (!isMobile && drawerOpen) {
      Animated.timing(drawerTranslateX, {
        toValue: -DRAWER_WIDTH,
        duration: 180,
        useNativeDriver: Platform.OS !== 'web',
      }).start(({ finished }) => {
        if (finished) {
          setDrawerOpen(false);
        }
      });
      return;
    }

    if (drawerOpen) {
      Animated.timing(drawerTranslateX, {
        toValue: 0,
        duration: 220,
        useNativeDriver: Platform.OS !== 'web',
      }).start();
    } else {
      drawerTranslateX.setValue(-DRAWER_WIDTH);
    }
  }, [drawerOpen, drawerTranslateX, isMobile]);

  const closeDrawer = () => {
    Animated.timing(drawerTranslateX, {
      toValue: -DRAWER_WIDTH,
      duration: 180,
      useNativeDriver: Platform.OS !== 'web',
    }).start(({ finished }) => {
      if (finished) {
        setDrawerOpen(false);
      }
    });
  };

  const navigateTo = (route: (typeof NAV_ITEMS)[number]['route']) => {
    if (isMobile) {
      closeDrawer();
    }

    switch (route) {
      case 'DemoHome':
        navigation.navigate('DemoHome');
        break;
      case 'FiveCrosses':
        navigation.navigate(
          profile.isComplete
            ? profile.discoveryComplete
              ? 'FiveCrosses'
              : 'DiscoveryIntro'
            : 'ProfileSetup',
        );
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
      case 'Settings':
        navigation.navigate('Settings');
        break;
    }
  };

  const signOut = () => {
    navigation.getParent()?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Authentication', params: { screen: 'Login' } }],
      }),
    );
  };

  const renderNavigation = () => (
    <View style={styles.navItems}>
      {NAV_ITEMS.map((item) => {
        const isActive =
          activeTab === item.section ||
          (activeTab === 'Messaging' && item.section === 'MessagingInbox');
        return (
          <Pressable
            key={item.route}
            onPress={() => navigateTo(item.route)}
            style={({ pressed }) => [
              styles.navItem,
              isActive && styles.navItemActive,
              hoveredRoute === item.route && styles.navItemHover,
              pressed && styles.navItemPressed,
            ]}
            onHoverIn={() => setHoveredRoute(item.route)}
            onHoverOut={() => setHoveredRoute(null)}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            accessibilityState={{ selected: isActive }}
          >
            <Text style={[styles.navIcon, isActive && styles.navTextActive]}>
              {item.icon}
            </Text>
            <Text style={[styles.navLabel, isActive && styles.navTextActive]}>
              {item.label}
            </Text>
            {isActive ? <View style={styles.activeMarker} /> : null}
          </Pressable>
        );
      })}
    </View>
  );

  const renderSidebar = (isDrawer = false) => (
    <View style={[styles.sidebar, isDrawer && styles.drawerSidebar]}>
      <View style={styles.brand}>
        {isDrawer ? (
          <Pressable
            onPress={closeDrawer}
            style={styles.closeDrawer}
            accessibilityRole="button"
            accessibilityLabel="Close navigation menu"
          >
            <Text style={styles.closeDrawerText}>×</Text>
          </Pressable>
        ) : null}
        <Text style={styles.wordmark}>CROSSED</Text>
        <Text style={styles.brandTagline}>Fewer profiles. Better connections.</Text>
      </View>
      {renderNavigation()}
      <Pressable
        onPress={signOut}
        style={({ pressed }) => [styles.signOutButton, pressed && styles.navItemPressed]}
        accessibilityRole="button"
        accessibilityLabel="Sign out"
      >
        <Text style={styles.signOutIcon}>↪</Text>
        <Text style={styles.signOutLabel}>Sign out</Text>
      </Pressable>
      <View style={styles.sidebarFooter}>
        <View style={styles.brandMark}>
          <View style={styles.brandMarkVertical} />
          <View style={styles.brandMarkHorizontal} />
          <View style={styles.brandMarkCenter} />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.appLayout}>
        {!isMobile ? renderSidebar() : null}
        <View style={styles.main}>
          <View style={styles.topBar}>
            {isMobile ? (
              <View style={styles.mobileBrand}>
                <Pressable
                  onPress={() => setDrawerOpen(true)}
                  style={({ pressed }) => [styles.menuButton, pressed && styles.pressed]}
                  accessibilityRole="button"
                  accessibilityLabel="Open navigation menu"
                  accessibilityState={{ expanded: drawerOpen }}
                >
                  <Text style={styles.menuIcon}>☰</Text>
                </Pressable>
                <Text style={styles.mobileWordmark}>CROSSED</Text>
              </View>
            ) : <View />}
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
        </View>
      </View>
      {isMobile && drawerOpen ? (
        <View style={styles.drawerOverlay}>
          <Pressable
            onPress={closeDrawer}
            style={styles.drawerBackdrop}
            accessibilityRole="button"
            accessibilityLabel="Close navigation menu"
          />
          <Animated.View
            style={[
              styles.drawerPanel,
              { transform: [{ translateX: drawerTranslateX }] },
            ]}
          >
            {renderSidebar(true)}
          </Animated.View>
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
    overflow: 'hidden',
  },
  appLayout: {
    flex: 1,
    flexDirection: 'row',
    minWidth: 0,
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    backgroundColor: COLORS.white,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: COLORS.border,
    paddingTop: SPACING.xl,
    paddingHorizontal: SPACING.md,
    paddingBottom: Platform.OS === 'web' ? WEB_BADGE_CLEARANCE : SPACING.lg,
  },
  drawerSidebar: {
    width: DRAWER_WIDTH,
    height: '100%',
    borderRightWidth: 0,
    paddingTop: SPACING.lg,
    paddingBottom: Platform.OS === 'web' ? WEB_BADGE_CLEARANCE : SPACING.lg,
  },
  brand: {
    minHeight: 94,
    justifyContent: 'center',
    paddingHorizontal: SPACING.sm,
    marginBottom: SPACING.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  wordmark: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 3.2,
  },
  brandTagline: {
    color: COLORS.muted,
    fontSize: 10,
    lineHeight: 15,
    marginTop: SPACING.xs,
  },
  navItems: {
    gap: SPACING.xs,
  },
  navItem: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    position: 'relative',
  },
  navItemActive: {
    backgroundColor: '#EFF3EF',
  },
  navItemHover: {
    backgroundColor: '#F4F6F3',
  },
  navItemPressed: {
    backgroundColor: '#E5ECE6',
  },
  navIcon: {
    width: 23,
    color: COLORS.muted,
    fontSize: 19,
    textAlign: 'center',
  },
  navLabel: {
    color: COLORS.text,
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
  },
  navTextActive: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  activeMarker: {
    position: 'absolute',
    left: 0,
    top: 10,
    bottom: 10,
    width: 3,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: COLORS.secondary,
  },
  signOutButton: {
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingHorizontal: SPACING.md,
    marginTop: 'auto',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
  },
  signOutIcon: {
    width: 23,
    color: COLORS.muted,
    fontSize: 18,
    textAlign: 'center',
  },
  signOutLabel: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  sidebarFooter: {
    minHeight: 72,
    justifyContent: 'flex-end',
    paddingHorizontal: SPACING.sm,
  },
  brandMark: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.75,
  },
  brandMarkVertical: {
    position: 'absolute',
    width: 1,
    height: 30,
    backgroundColor: COLORS.secondary,
  },
  brandMarkHorizontal: {
    position: 'absolute',
    height: 1,
    width: 30,
    backgroundColor: COLORS.secondary,
  },
  brandMarkCenter: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  main: {
    flex: 1,
    minWidth: 0,
    backgroundColor: COLORS.background,
  },
  topBar: {
    width: '100%',
    height: 64,
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mobileBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  mobileWordmark: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 3,
  },
  menuButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  menuIcon: {
    color: COLORS.primary,
    fontSize: 18,
  },
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
  drawerOverlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 20,
    flexDirection: 'row',
  },
  drawerBackdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(25, 39, 32, 0.38)',
  },
  drawerPanel: {
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: COLORS.white,
    elevation: 12,
    shadowColor: '#162B21',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
  },
  closeDrawer: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.round,
    backgroundColor: '#F1F4F0',
  },
  closeDrawerText: {
    color: COLORS.primary,
    fontSize: 24,
    lineHeight: 26,
  },
  scroll: {
    flex: 1,
    width: '100%',
    minWidth: 0,
  },
  content: {
    width: '100%',
    maxWidth: 1000,
    alignSelf: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: Platform.OS === 'web' ? SPACING.xxl + WEB_BADGE_CLEARANCE : SPACING.xxl,
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
