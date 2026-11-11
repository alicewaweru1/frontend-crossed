import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Authentication: NavigatorScreenParams<AuthStackParamList> | undefined;
  Demonstration: NavigatorScreenParams<DemoStackParamList> | undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type DemoStackParamList = {
  ProfileSetup: undefined;
  DiscoveryIntro: undefined;
  Discovery: undefined;
  DemoHome: undefined;
  FiveCrosses: undefined;
  Connections: undefined;
  MessagingInbox: undefined;
  Messaging: { profileId?: string } | undefined;
  ProfilePreview: { profileId?: string } | undefined;
  Settings: undefined;
};