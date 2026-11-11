import React, { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import AuthButton from '../../components/AuthButton';
import AuthScreenFrame from '../../components/AuthScreenFrame';
import type { AuthStackParamList, RootStackParamList } from '../../navigation/types';
import { COLORS } from '../../theme/colors';
import { RADIUS, SPACING } from '../../theme/spacing';

type Props = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'Register'>,
  NativeStackScreenProps<RootStackParamList>
>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isError, setIsError] = useState(false);
  const [continueToHome, setContinueToHome] = useState(false);

  useEffect(() => {
    if (!continueToHome) {
      return undefined;
    }

    const timer = setTimeout(
      () => navigation.replace('Demonstration', { screen: 'DemoHome' }),
      500,
    );
    return () => clearTimeout(timer);
  }, [continueToHome, navigation]);

  const handleRegister = () => {
    const normalizedName = name.trim();
    const normalizedEmail = email.trim();
    if (!normalizedName || !normalizedEmail || !password || !confirmPassword) {
      setIsError(true);
      setFeedback('Complete each field to continue.');
      return;
    }

    if (normalizedName.split(/\s+/).length < 2) {
      setIsError(true);
      setFeedback('Enter a first and last name for the illustrative profile.');
      return;
    }

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setIsError(true);
      setFeedback('Enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setIsError(true);
      setFeedback('Choose a password with at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setIsError(true);
      setFeedback('The passwords do not match.');
      return;
    }

    setIsError(false);
    setFeedback('Your illustrative account is ready. Opening Crossed…');
    setContinueToHome(true);
  };

  return (
    <AuthScreenFrame>
      <View style={styles.form}>
        <Text style={styles.eyebrow}>BEGIN WITH INTENTION</Text>
        <Text style={styles.heading}>Create account</Text>
        <Text style={styles.subtitle}>
          A few details to begin a more considered experience.
        </Text>

        <Text style={styles.label}>Full name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Amani Mwangi"
          placeholderTextColor={COLORS.muted}
          autoCapitalize="words"
          textContentType="name"
          value={name}
          onChangeText={setName}
          accessibilityLabel="Full name"
        />

        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="name@example.com"
          placeholderTextColor={COLORS.muted}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
          accessibilityLabel="Email address"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="At least 8 characters"
            placeholderTextColor={COLORS.muted}
            secureTextEntry={!showPassword}
            textContentType="newPassword"
            value={password}
            onChangeText={setPassword}
            accessibilityLabel="Password"
          />
          <Pressable
            onPress={() => setShowPassword((visible) => !visible)}
            accessibilityRole="button"
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
          >
            <Text style={styles.showPassword}>{showPassword ? 'Hide' : 'Show'}</Text>
          </Pressable>
        </View>

        <Text style={styles.label}>Confirm password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password again"
            placeholderTextColor={COLORS.muted}
            secureTextEntry={!showConfirmation}
            textContentType="newPassword"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            accessibilityLabel="Confirm password"
          />
          <Pressable
            onPress={() => setShowConfirmation((visible) => !visible)}
            accessibilityRole="button"
            accessibilityLabel={showConfirmation ? 'Hide confirmation password' : 'Show confirmation password'}
          >
            <Text style={styles.showPassword}>{showConfirmation ? 'Hide' : 'Show'}</Text>
          </Pressable>
        </View>

        {feedback ? (
          <Text
            style={[styles.feedback, isError ? styles.errorText : styles.successText]}
            accessibilityRole={isError ? 'alert' : 'text'}
            accessibilityLiveRegion="polite"
          >
            {feedback}
          </Text>
        ) : null}

        <AuthButton title="Create Account" onPress={handleRegister} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable
            onPress={() => navigation.navigate('Login')}
            accessibilityRole="button"
          >
            <Text style={styles.linkText}>Log in</Text>
          </Pressable>
        </View>
      </View>
    </AuthScreenFrame>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: SPACING.xs,
  },
  eyebrow: {
    color: '#92702A',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: SPACING.xs,
  },
  heading: {
    color: COLORS.primary,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: -0.7,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: SPACING.xs,
  },
  label: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: '700',
    marginTop: SPACING.xs,
  },
  input: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
    color: COLORS.text,
    fontSize: 13,
  },
  passwordContainer: {
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
  },
  passwordInput: {
    flex: 1,
    minWidth: 0,
    paddingVertical: SPACING.sm,
    color: COLORS.text,
    fontSize: 13,
  },
  showPassword: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '800',
    paddingLeft: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  feedback: {
    fontSize: 11,
    lineHeight: 16,
    marginTop: SPACING.xs,
  },
  errorText: {
    color: '#A63D31',
  },
  successText: {
    color: COLORS.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.xs,
    marginTop: SPACING.sm,
  },
  footerText: {
    color: COLORS.muted,
    fontSize: 11,
  },
  linkText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
  },
});
