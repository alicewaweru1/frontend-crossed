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
    title: 'Connection deserves a little more care.',
    description:
      'A meaningful connection starts when we make space to notice one another.',
  },
  {
    id: '2',
    label: 'OUR PHILOSOPHY',
    title: 'Fewer introductions. More room to connect.',
    description:
      'We believe the best moments deserve more attention than an endless feed.',
  },
  {
    id: '3',
    label: 'THE EXPERIENCE',
    title: 'Meet with intention.',
    description:
      'Take your time with each story. Let curiosity lead the way.',
  },
];