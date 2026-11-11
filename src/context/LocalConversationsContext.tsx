import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { Introduction } from '../screens/demo/demoData';

export type LocalMessage = {
  id: string;
  sender: string;
  avatar: string;
  mine: boolean;
  text: string;
  time: string;
};

type LocalConversationsContextValue = {
  conversationIds: string[];
  messagesByProfile: Record<string, LocalMessage[]>;
  openConversation: (profile: Introduction) => void;
  sendMessage: (profileId: string, text: string) => void;
};

const LocalConversationsContext = createContext<LocalConversationsContextValue | null>(null);

function createOpeningMessages(profile: Introduction): LocalMessage[] {
  return [
    {
      id: `${profile.id}-opening`,
      sender: profile.name,
      avatar: profile.initials,
      mine: false,
      text: profile.response,
      time: '9:12 AM',
    },
    {
      id: `${profile.id}-reply`,
      sender: 'You',
      avatar: 'Y',
      mine: true,
      text: 'That sounds lovely. What do you enjoy most about it?',
      time: '9:14 AM',
    },
  ];
}

export function LocalConversationsProvider({ children }: { children: React.ReactNode }) {
  const [conversationIds, setConversationIds] = useState<string[]>([]);
  const [messagesByProfile, setMessagesByProfile] = useState<Record<string, LocalMessage[]>>({});

  const openConversation = useCallback((profile: Introduction) => {
    setConversationIds((current) =>
      current.includes(profile.id) ? current : [...current, profile.id],
    );
    setMessagesByProfile((current) =>
      current[profile.id]
        ? current
        : { ...current, [profile.id]: createOpeningMessages(profile) },
    );
  }, []);

  const sendMessage = useCallback((profileId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    setMessagesByProfile((current) => ({
      ...current,
      [profileId]: [
        ...(current[profileId] ?? []),
        {
          id: `${profileId}-${Date.now()}`,
          sender: 'You',
          avatar: 'Y',
          mine: true,
          text: trimmed,
          time: 'Now',
        },
      ],
    }));
  }, []);

  const value = useMemo(
    () => ({ conversationIds, messagesByProfile, openConversation, sendMessage }),
    [conversationIds, messagesByProfile, openConversation, sendMessage],
  );

  return (
    <LocalConversationsContext.Provider value={value}>
      {children}
    </LocalConversationsContext.Provider>
  );
}

export function useLocalConversations() {
  const value = useContext(LocalConversationsContext);
  if (!value) {
    throw new Error('useLocalConversations must be used within LocalConversationsProvider');
  }
  return value;
}
