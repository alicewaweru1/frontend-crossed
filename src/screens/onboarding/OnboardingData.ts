export type OnboardingItem = {
  id: string;
  title: string;
  description: string;
  label: string;
};

export const ONBOARDING_DATA: OnboardingItem[] = [
  {
    id: '1',
    label: 'INTRODUCTION',
    title: 'Welcome to Crossed',
    description:
      'A thoughtful approach to building meaningful connections.',
  },
  {
    id: '2',
    label: 'OUR PHILOSOPHY',
    title: 'Fewer profiles, better connections.',
    description:
      'We believe meaningful experiences deserve more attention than endless scrolling.',
  },
  {
    id: '3',
    label: 'THE EXPERIENCE',
    title: 'Make every connection count.',
    description:
      'Discover an intentional, simple and thoughtfully designed experience.',
  },
];