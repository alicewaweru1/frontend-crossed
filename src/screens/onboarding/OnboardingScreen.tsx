import React, { useState } from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
import { ONBOARDING_DATA } from './OnboardingData';
import OnboardingCard from './OnboardingCard';
import OnboardingProgress from './OnboardingProgress';
import CrossedButton from '../../components/CrossedButton';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export default function OnboardingScreen({ navigation }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = ONBOARDING_DATA[currentIndex];

  const isLastPage =
    currentIndex === ONBOARDING_DATA.length - 1;

  const handleNext = () => {
    if (isLastPage) {
      navigation.replace('Authentication', { screen: 'Login' });
      return;
    }

    setCurrentIndex((index) => Math.min(index + 1, ONBOARDING_DATA.length - 1));
  };

  const handleBack = () => {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>CROSSED</Text>
        <Text style={styles.pageCount}>
          {String(currentIndex + 1).padStart(2, '0')} / {String(ONBOARDING_DATA.length).padStart(2, '0')}
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <OnboardingCard item={currentItem} />
      </View>

      <View style={styles.footer}>
        <OnboardingProgress
          total={ONBOARDING_DATA.length}
          current={currentIndex}
        />

        <View style={styles.navigation}>
          {currentIndex > 0 ? (
            <Pressable
              style={styles.backButton}
              onPress={handleBack}
              accessibilityRole="button"
              accessibilityLabel="Go to previous introduction"
            >
              <Text style={styles.backButtonText}>Back</Text>
            </Pressable>
          ) : <View style={styles.backPlaceholder} />}

          <View style={styles.nextButton}>
            <CrossedButton
              title={isLastPage ? 'Finish' : 'Continue'}
              onPress={handleNext}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 3.2,
  },

  pageCount: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
  },

  cardContainer: {
    flex: 1,
  },

  footer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    gap: SPACING.lg,
  },

  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    minWidth: 96,
    minHeight: 52,
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
  },

  backButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },

  backPlaceholder: {
    minWidth: 96,
    minHeight: 52,
  },

  nextButton: {
    width: 150,
  },
});