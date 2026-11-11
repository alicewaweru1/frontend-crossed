import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ConnectionsScreen from '../screens/demo/ConnectionsScreen';
import DiscoveryIntroScreen from '../screens/demo/DiscoveryIntroScreen';
import DiscoveryScreen from '../screens/demo/DiscoveryScreen';
import DemoHomeScreen from '../screens/demo/DemoHomeScreen';
import FiveCrossesScreen from '../screens/demo/FiveCrossesScreen';
import MessagingInboxScreen from '../screens/demo/MessagingInboxScreen';
import MessagingScreen from '../screens/demo/MessagingScreen';
import ProfileSetupScreen from '../screens/demo/ProfileSetupScreen';
import ProfilePreviewScreen from '../screens/demo/ProfilePreviewScreen';
import SettingsScreen from '../screens/demo/SettingsScreen';
import { DemoProfileProvider } from '../context/DemoProfileContext';
import type { DemoStackParamList } from './types';

const Stack = createNativeStackNavigator<DemoStackParamList>();

export default function DemoNavigator() {
  return (
    <DemoProfileProvider>
      <Stack.Navigator
        initialRouteName="ProfileSetup"
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}
      >
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="DiscoveryIntro" component={DiscoveryIntroScreen} />
        <Stack.Screen name="Discovery" component={DiscoveryScreen} />
        <Stack.Screen name="DemoHome" component={DemoHomeScreen} />
        <Stack.Screen name="FiveCrosses" component={FiveCrossesScreen} />
        <Stack.Screen name="Connections" component={ConnectionsScreen} />
        <Stack.Screen name="MessagingInbox" component={MessagingInboxScreen} />
        <Stack.Screen name="Messaging" component={MessagingScreen} />
        <Stack.Screen name="ProfilePreview" component={ProfilePreviewScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </DemoProfileProvider>
  );
}
