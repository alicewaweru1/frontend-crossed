import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, type LinkingOptions } from '@react-navigation/native';

import WelcomeScreen from '../screens/profile/WelcomeScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import AuthNavigator from './AuthNavigator';
import DemoNavigator from './DemoNavigator';

import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [],
  config: {
    screens: {
      Welcome: '',
      Onboarding: 'onboarding',
      Authentication: {
        path: 'auth',
        screens: {
          Login: 'login',
          Register: 'register',
        },
      },
      Demonstration: {
        path: 'preview',
        screens: {
          DemoHome: 'home',
          FiveCrosses: 'five-crosses',
          Connections: 'connections',
          MessagingInbox: 'messages',
          Messaging: 'messages/chat/:profileId?',
          ProfilePreview: 'profile/:profileId?',
          Settings: 'settings',
          ProfileSetup: 'profile-setup',
          DiscoveryIntro: 'discovery',
          Discovery: 'finding-crosses',
        },
      },
    },
  },
};

export default function RootNavigator() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
        />

        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
        />

        <Stack.Screen
          name="Authentication"
          component={AuthNavigator}
        />

        <Stack.Screen
          name="Demonstration"
          component={DemoNavigator}
          options={{ animation: 'slide_from_right' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}