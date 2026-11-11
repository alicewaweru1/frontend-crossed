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
  NativeStackScreenProps<AuthStackParamList, 'Login'>,
  NativeStackScreenProps<RootStackParamList>
>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const handleLogin = () => {
    const normalizedEmail = email.trim();
    if (!normalizedEmail || !password) {
      setIsError(true);
      setFeedback('Enter your email address and password to continue.');
      return;
    }

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setIsError(true);
      setFeedback('Enter a valid email address.');
      return;
    }

    setIsError(false);
    setFeedback('Welcome back. Opening your Crossed experience…');
    setContinueToHome(true);
  };

  return (
    <AuthScreenFrame>
      <View style={styles.form}>
        <Text style={styles.eyebrow}>GOOD TO SEE YOU</Text>
        <Text style={styles.heading}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Sign in to continue your considered experience.
        </Text>

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
            placeholder="Enter your password"
            placeholderTextColor={COLORS.muted}
            secureTextEntry={!showPassword}
            textContentType="password"
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

        <Pressable
          onPress={() => {
            setIsError(false);
            setFeedback('Password recovery is not available in this illustrative experience.');
          }}
          style={({ pressed }) => [styles.forgotAction, pressed && styles.pressed]}
          accessibilityRole="button"
        >
          <Text style={styles.linkText}>Forgot password?</Text>
        </Pressable>

        {feedback ? (
          <Text
            style={[styles.feedback, isError ? styles.errorText : styles.successText]}
            accessibilityRole={isError ? 'alert' : 'text'}
            accessibilityLiveRegion="polite"
          >
            {feedback}
          </Text>
        ) : null}

        <AuthButton title="Log In" onPress={handleLogin} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don’t have an account?</Text>
          <Pressable
            onPress={() => navigation.navigate('Register')}
            accessibilityRole="button"
          >
            <Text style={styles.linkText}>Create account</Text>
          </Pressable>
        </View>
      </View>
    </AuthScreenFrame>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: SPACING.sm,
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
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
    letterSpacing: -0.8,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: SPACING.sm,
  },
  label: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '700',
    marginTop: SPACING.xs,
  },
  input: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
    color: COLORS.text,
    fontSize: 14,
  },
  passwordContainer: {
    minHeight: 50,
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
    fontSize: 14,
  },
  showPassword: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '800',
    paddingLeft: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  forgotAction: {
    alignSelf: 'flex-end',
    paddingVertical: SPACING.xs,
    marginTop: -SPACING.xs,
  },
  linkText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
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
    marginTop: SPACING.md,
  },
  footerText: {
    color: COLORS.muted,
    fontSize: 12,
  },
  pressed: {
    opacity: 0.72,
  },
});
