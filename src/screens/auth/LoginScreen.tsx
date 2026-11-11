import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';

import COLORS from '../../constants/colors';
import AuthButton from '../../components/AuthButton';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/auth';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { RootStackParamList } from '../../navigation/types';

type Props = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'Login'>,
  NativeStackScreenProps<RootStackParamList>
>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password) {
      Alert.alert('Missing information', 'Please enter your email and password.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email.trim())) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    Alert.alert(
      'Sign-in isn’t available yet',
      'You can still explore the Crossed experience.'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.logo}>CROSSED</Text>
          <Text style={styles.tagline}>
            MEANINGFUL CONNECTIONS. INTENTIONAL LOVE.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.heading}>Welcome back.</Text>

          <Text style={styles.subtitle}>
            Your next meaningful connection starts here.
          </Text>

          <Text style={styles.label}>Email address</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={COLORS.muted}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              placeholderTextColor={COLORS.muted}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.showPassword}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.forgotContainer}
            onPress={() =>
              Alert.alert('Password help', 'Password recovery isn’t available in this experience yet.')
            }
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          <AuthButton
            title="LOG IN"
            onPress={handleLogin}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don&apos;t have an account?
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.registerText}> Create one</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.demoLink}
            onPress={() => navigation.navigate('Demonstration')}
            accessibilityRole="button"
          >
            <Text style={styles.demoLinkText}>Explore Crossed</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.bottomText}>
          FEWER PROFILES. BETTER CONNECTIONS.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 25,
  },

  header: {
    alignItems: 'center',
    marginBottom: 55,
  },

  logo: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 5,
    color: COLORS.primary,
  },

  tagline: {
    fontSize: 9,
    letterSpacing: 2,
    color: COLORS.muted,
    marginTop: 8,
  },

  form: {
    width: '100%',
  },

  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 10,
    marginBottom: 35,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 9,
    marginTop: 18,
  },

  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: COLORS.text,
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 15,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 15,
    color: COLORS.text,
  },

  showPassword: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },

  forgotContainer: {
    alignItems: 'flex-end',
    marginTop: 15,
  },

  forgotText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 13,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },

  demoLink: {
    alignItems: 'center',
    paddingVertical: 18,
    marginTop: 6,
  },

  demoLinkText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },

  footerText: {
    color: COLORS.muted,
    fontSize: 14,
  },

  registerText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },

  bottomText: {
    textAlign: 'center',
    color: COLORS.muted,
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 55,
  },
});

export default LoginScreen;