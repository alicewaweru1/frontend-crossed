import React, { useEffect } from 'react';
import {
  Pressable,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { COLORS } from '../../theme/colors';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Welcome'
>;

export default function WelcomeScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('Onboarding'), 1400);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.logo}>CROSSED</Text>
        <View style={styles.mark}>
          <View style={styles.markVertical} />
          <View style={styles.markHorizontal} />
          <View style={styles.markCenter} />
        </View>
      </View>
      <View style={styles.message}>
        <Text style={styles.eyebrow}>A MORE THOUGHTFUL WAY TO MEET</Text>
        <Text style={styles.title}>Make room for something real.</Text>
        <Text style={styles.tagline}>
            Fewer profiles. Better connections.
        </Text>
      </View>
      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [styles.onboardingAction, pressed && styles.pressed]}
          onPress={() => navigation.navigate('Onboarding')}
          accessibilityRole="button"
        >
          <Text style={styles.onboardingActionText}>Discover the Crossed philosophy</Text>
        </Pressable>
        <Text style={styles.footerNote}>A considered introduction starts here.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 28,
    paddingTop: 16,
    paddingBottom: 28,
    justifyContent: 'space-between',
  },

  top: {
    width: '100%',
    maxWidth: 720,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 3.2,
    color: COLORS.primary,
  },

  mark: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },

  markVertical: {
    position: 'absolute',
    width: 1,
    height: 36,
    backgroundColor: COLORS.secondary,
  },

  markHorizontal: {
    position: 'absolute',
    height: 1,
    width: 36,
    backgroundColor: COLORS.secondary,
  },

  markCenter: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.background,
  },

  message: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
    gap: 20,
    paddingBottom: 20,
  },

  eyebrow: {
    color: '#A87B21',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.8,
  },

  title: {
    color: COLORS.primary,
    fontSize: 42,
    lineHeight: 48,
    fontWeight: '700',
    letterSpacing: -1.6,
    maxWidth: 440,
  },

  tagline: {
    fontSize: 16,
    lineHeight: 26,
    color: COLORS.text,
    maxWidth: 310,
  },

  footer: {
    gap: 10,
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
  },

  onboardingAction: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  onboardingActionText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },

  pressed: {
    opacity: 0.72,
  },

  footerNote: {
    color: COLORS.muted,
    fontSize: 11,
    textAlign: 'center',
  },
});