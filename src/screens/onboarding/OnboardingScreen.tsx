import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';

import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
import { ONBOARDING_DATA } from './OnboardingData';
import OnboardingCard from './OnboardingCard';
import OnboardingProgress from './OnboardingProgress';
import CrossedButton from '../../components/CrossedButton';

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = ONBOARDING_DATA[currentIndex];

  const isLastPage =
    currentIndex === ONBOARDING_DATA.length - 1;

  const handleNext = () => {
    if (isLastPage) {
      Alert.alert(
        'Introduction complete',
        'You have completed the Crossed introduction.',
      );
      return;
    }

    setCurrentIndex(currentIndex + 1);
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>CROSSED</Text>
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
            <Text style={styles.backButton} onPress={handleBack}>
              Back
            </Text>
          ) : (
            <View />
          )}

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
    paddingTop: SPACING.lg,
  },

  logo: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 4,
  },

  cardContainer: {
    flex: 1,
  },

  footer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    gap: SPACING.xl,
  },

  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
    padding: SPACING.sm,
  },

  nextButton: {
    width: 150,
  },
});