export type Introduction = {
  id: string;
  name: string;
  age: number;
  initials: string;
  location: string;
  introduction: string;
  interests: string[];
  values: string[];
  lifestyle: string[];
  qualities: string[];
  prompt: string;
  response: string;
};

export const INTRODUCTIONS: Introduction[] = [
  {
    id: 'w-mwangi',
    name: 'Wanjiku Mwangi',
    age: 29,
    initials: 'WM',
    location: 'Nairobi, Kenya',
    introduction: 'Drawn to slow mornings, thoughtful books and new trails.',
    interests: ['Independent bookshops', 'Sunday markets', 'Hiking'],
    values: ['Kindness', 'Curiosity', 'Community'],
    lifestyle: ['Quiet weekends', 'Time outdoors', 'Community-minded'],
    qualities: ['Warm communication', 'Shared values', 'Room to grow'],
    prompt: 'A perfect Sunday looks like…',
    response: 'A long walk in Karura Forest, then chai and a good book.',
  },
  {
    id: 'd-okafor',
    name: 'Daniel Okafor',
    age: 31,
    initials: 'DO',
    location: 'Lagos, Nigeria',
    introduction: 'Finding beauty in the everyday and joy around the table.',
    interests: ['Architecture', 'Cooking', 'Live football'],
    values: ['Family', 'Community', 'Honesty'],
    lifestyle: ['Shared meals', 'Creative city life', 'Community-minded'],
    qualities: ['Warm communication', 'Shared values', 'A sense of humour'],
    prompt: 'Something I never tire of…',
    response: 'A city walk that ends with a meal shared among friends.',
  },
  {
    id: 'a-johnson',
    name: 'Amara Johnson',
    age: 28,
    initials: 'AJ',
    location: 'Atlanta, Georgia',
    introduction: 'Warm conversations, creative corners and a little wonder.',
    interests: ['Poetry', 'Jazz', 'Community gardens'],
    values: ['Creativity', 'Kindness', 'Community'],
    lifestyle: ['Creative city life', 'Community-minded', 'Quiet weekends'],
    qualities: ['Emotional openness', 'Room to grow', 'A sense of humour'],
    prompt: 'A small thing that makes my day…',
    response: 'Finding a new poem and sharing it with someone I love.',
  },
  {
    id: 'm-rivera',
    name: 'Mateo Rivera',
    age: 32,
    initials: 'MR',
    location: 'Austin, Texas',
    introduction: 'A curious maker who believes the best plans leave room.',
    interests: ['Ceramics', 'Trail walks', 'Cooking'],
    values: ['Curiosity', 'Creativity', 'Family'],
    lifestyle: ['Time outdoors', 'Shared meals', 'Quiet weekends'],
    qualities: ['Room to grow', 'Warm communication', 'Emotional openness'],
    prompt: 'The best kind of evening…',
    response: 'Making dinner together, with music on and nowhere to rush.',
  },
  {
    id: 'n-brooks',
    name: 'Nia Brooks',
    age: 30,
    initials: 'NB',
    location: 'Brooklyn, New York',
    introduction: 'Rooted in kindness, good stories and a good neighborhood.',
    interests: ['Independent film', 'Soul music', 'Travel'],
    values: ['Kindness', 'Honesty', 'Community'],
    lifestyle: ['Creative city life', 'Community-minded', 'Time outdoors'],
    qualities: ['Emotional openness', 'Shared values', 'A sense of humour'],
    prompt: 'I will always make time for…',
    response: 'A neighborhood cinema and the conversation afterwards.',
  },
];

export const FEATURED_INTRODUCTION = INTRODUCTIONS[0];

export const CONNECTION_EXAMPLES = [
  {
    id: 'w-mwangi',
    note: 'A shared appreciation for quiet trails and curious conversations.',
  },
  {
    id: 'm-rivera',
    note: 'A love of making things by hand and meals that linger.',
  },
];

export const MESSAGE_EXAMPLES = [
  {
    id: 'w-mwangi',
    preview: 'What’s a book you’ve found yourself thinking about lately?',
  },
  {
    id: 'm-rivera',
    preview: 'I know a trail with a lovely view just before sunset.',
  },
  {
    id: 'a-johnson',
    preview: 'That poem sounds beautiful. I’d love to hear more about it.',
  },
];
