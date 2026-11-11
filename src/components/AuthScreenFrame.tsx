import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '../theme/colors';
import { RADIUS, SPACING } from '../theme/spacing';

export default function AuthScreenFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.brand}>
          <View style={styles.brandMark}>
            <View style={styles.markVertical} />
            <View style={styles.markHorizontal} />
            <View style={styles.markCenter} />
          </View>
          <Text style={styles.wordmark}>CROSSED</Text>
          <Text style={styles.tagline}>FEWER PROFILES. BETTER CONNECTIONS.</Text>
        </View>
        <View style={styles.card}>{children}</View>
        <Text style={styles.note}>
          Illustrative only. Your details are not saved or sent.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  brand: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  brandMark: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  markVertical: {
    position: 'absolute',
    width: 1,
    height: 34,
    backgroundColor: COLORS.secondary,
  },
  markHorizontal: {
    position: 'absolute',
    height: 1,
    width: 34,
    backgroundColor: COLORS.secondary,
  },
  markCenter: {
    width: 7,
    height: 7,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  wordmark: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 4,
  },
  tagline: {
    color: COLORS.muted,
    fontSize: 8,
    letterSpacing: 1.6,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
  },
  note: {
    maxWidth: 340,
    marginTop: SPACING.md,
    color: COLORS.muted,
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
  },
});
