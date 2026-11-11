import React, { createContext, useContext, useMemo, useState } from 'react';

export type AvatarChoice = {
  id: string;
  initials: string;
  name: string;
  background: string;
  foreground: string;
  symbol: string;
};

export const DEMO_AVATARS: AvatarChoice[] = [
  { id: 'sunrise', initials: 'AM', name: 'Amani Mwangi', background: '#E8D5B6', foreground: '#174A3A', symbol: '☼' },
  { id: 'garden', initials: 'MT', name: 'Maya Thompson', background: '#D5E2D6', foreground: '#174A3A', symbol: '✿' },
  { id: 'studio', initials: 'DK', name: 'Daniel Kamau', background: '#E7D7DC', foreground: '#51394A', symbol: '◈' },
  { id: 'coast', initials: 'NO', name: 'Nia Okafor', background: '#D4E1E7', foreground: '#24495C', symbol: '≈' },
];

export const INTEREST_OPTIONS = [
  'Books & ideas',
  'Hiking',
  'Cooking',
  'Live music',
  'Art & design',
  'Travel',
  'Community',
];

export const VALUE_OPTIONS = [
  'Kindness',
  'Curiosity',
  'Family',
  'Creativity',
  'Community',
  'Honesty',
];

export const LIFESTYLE_OPTIONS = [
  'Quiet weekends',
  'Time outdoors',
  'Creative city life',
  'Shared meals',
  'Community-minded',
];

export const CONNECTION_QUALITY_OPTIONS = [
  'Warm communication',
  'A sense of humour',
  'Room to grow',
  'Shared values',
  'Emotional openness',
];

export type DemoProfile = {
  avatarId: string;
  interests: string[];
  values: string[];
  lifestyle: string[];
  qualities: string[];
  isComplete: boolean;
};

type DemoProfileContextValue = {
  profile: DemoProfile;
  avatar: AvatarChoice;
  updateProfile: (updates: Partial<DemoProfile>) => void;
};

const DemoProfileContext = createContext<DemoProfileContextValue | null>(null);

const initialProfile: DemoProfile = {
  avatarId: DEMO_AVATARS[0].id,
  interests: ['Hiking', 'Books & ideas', 'Cooking'],
  values: ['Kindness', 'Curiosity'],
  lifestyle: ['Quiet weekends', 'Time outdoors'],
  qualities: ['Warm communication', 'Shared values'],
  isComplete: false,
};

export function DemoProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState(initialProfile);
  const avatar = DEMO_AVATARS.find((item) => item.id === profile.avatarId) ?? DEMO_AVATARS[0];
  const value = useMemo(
    () => ({
      profile,
      avatar,
      updateProfile: (updates: Partial<DemoProfile>) =>
        setProfile((current) => ({ ...current, ...updates })),
    }),
    [profile, avatar],
  );

  return <DemoProfileContext.Provider value={value}>{children}</DemoProfileContext.Provider>;
}

export function useDemoProfile() {
  const value = useContext(DemoProfileContext);
  if (!value) {
    throw new Error('useDemoProfile must be used within DemoProfileProvider');
  }
  return value;
}
