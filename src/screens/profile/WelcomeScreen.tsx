import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { COLORS } from '../../theme/colors';
import CrossedButton from '../../components/CrossedButton';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Welcome'
>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>CROSSED</Text>

      <Text style={styles.tagline}>
        Fewer profiles, better connections.
      </Text>

      <CrossedButton
        title="Continue"
        onPress={() => navigation.navigate('Onboarding')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 5,
    color: COLORS.primary,
    marginBottom: 16,
  },

  tagline: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 40,
    textAlign: 'center',
  },
});