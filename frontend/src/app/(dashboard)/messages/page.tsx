"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Conversation {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
    isOnline: boolean;
  };
  lastMessage: {
    text: string;
    time: string;
    isRead: boolean;
    isMine: boolean;
  };
  unreadCount: number;
}

const BackIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const NewMessageIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <line x1="12" y1="8" x2="12" y2="14" />
    <line x1="9" y1="11" x2="15" y2="11" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const mockConversations: Conversation[] = [
  {
    id: "1",
    user: {
      name: "Sarah Wilson",
      username: "sarahw",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      isOnline: true,
    },
    lastMessage: {
      text: "Hey! Did you see the new post I shared?",
      time: "2m",
      isRead: false,
      isMine: false,
    },
    unreadCount: 3,
  },
  {
    id: "2",
    user: {
      name: "Mike Chen",
      username: "mikechen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      isOnline: true,
    },
    lastMessage: {
      text: "That sounds great! Let me know when you're free",
      time: "15m",
      isRead: false,
      isMine: false,
    },
    unreadCount: 1,
  },
  {
    id: "3",
    user: {
      name: "Emma Roberts",
      username: "emmar",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      isOnline: false,
    },
    lastMessage: {
      text: "Thanks for the recommendation! 🙏",
      time: "1h",
      isRead: true,
      isMine: true,
    },
    unreadCount: 0,
  },
  {
    id: "4",
    user: {
      name: "Alex Turner",
      username: "alexturner",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      isOnline: false,
    },
    lastMessage: {
      text: "The event starts at 7pm tomorrow",
      time: "3h",
      isRead: true,
      isMine: false,
    },
    unreadCount: 0,
  },
  {
    id: "5",
    user: {
      name: "Lisa Park",
      username: "lisapark",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      isOnline: true,
    },
    lastMessage: {
      text: "I'll send you the photos soon!",
      time: "5h",
      isRead: true,
      isMine: false,
    },
    unreadCount: 0,
  },
  {
    id: "6",
    user: {
      name: "James Miller",
      username: "jamesmiller",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      isOnline: false,
    },
    lastMessage: {
      text: "See you there!",
      time: "1d",
      isRead: true,
      isMine: true,
    },
    unreadCount: 0,
  },
];

const Messages: React.FC = () => {
  const navigate = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = mockConversations.filter(
    (conv) =>
      conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground max-w-xl mx-auto border-r border-l">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-nav border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate.back()}
              className="p-2 -ml-2 hover:bg-muted/50 rounded-full transition-colors"
            >
              <BackIcon />
            </button>
            <h1 className="text-xl font-semibold">Messages</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search messages"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted/50 rounded-full py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>
      </header>

      {/* Conversations List */}
      <div className="pb-24">
        {filteredConversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => navigate.push(`/chat/999`)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors"
          >
            {/* Avatar with online indicator */}
            <div className="relative">
              <img
                src={conversation.user.avatar}
                alt={conversation.user.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              {conversation.user.isOnline && (
                <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background" />
              )}
            </div>

            {/* Message Content */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`font-semibold truncate ${
                    conversation.unreadCount > 0
                      ? "text-foreground"
                      : "text-foreground/90"
                  }`}
                >
                  {conversation.user.name}
                </span>
                <span
                  className={`text-xs flex-shrink-0 ${
                    conversation.unreadCount > 0
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {conversation.lastMessage.time}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <p
                  className={`text-sm truncate ${
                    conversation.unreadCount > 0
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {conversation.lastMessage.isMine && (
                    <span className="text-muted-foreground">You: </span>
                  )}
                  {conversation.lastMessage.text}
                </p>
                {conversation.unreadCount > 0 && (
                  <span className="flex-shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs font-semibold text-primary-foreground">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}

        {filteredConversations.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
              <SearchIcon />
            </div>
            <p className="text-muted-foreground text-center">
              No conversations found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
