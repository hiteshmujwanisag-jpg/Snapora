"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface Message {
  id: string;
  text: string;
  time: string;
  isMine: boolean;
  status?: "sent" | "delivered" | "read";
}

interface ChatUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
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

const PhoneIcon = () => (
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
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const VideoIcon = () => (
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
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const SendIcon = () => (
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
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const ImageIcon = () => (
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
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const MicIcon = () => (
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
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const DoubleCheckIcon = ({ read }: { read: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke={read ? "#3b82f6" : "currentColor"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="18 7 11 14 6 9" />
    <polyline points="23 7 16 14 14 12" />
  </svg>
);

const mockUsers: Record<string, ChatUser> = {
  "1": {
    id: "1",
    name: "Sarah Wilson",
    username: "sarahw",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    isOnline: true,
  },
  "2": {
    id: "2",
    name: "Mike Chen",
    username: "mikechen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    isOnline: true,
  },
  "3": {
    id: "3",
    name: "Emma Roberts",
    username: "emmar",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    isOnline: false,
    lastSeen: "2h ago",
  },
};

const mockMessages: Message[] = [
  { id: "1", text: "Hey! How are you doing?", time: "10:30 AM", isMine: false },
  {
    id: "2",
    text: "I'm great! Just finished working on that project we discussed.",
    time: "10:32 AM",
    isMine: true,
    status: "read",
  },
  {
    id: "3",
    text: "That's awesome! Can't wait to see it 🎉",
    time: "10:33 AM",
    isMine: false,
  },
  {
    id: "4",
    text: "I'll send you the link once it's deployed",
    time: "10:35 AM",
    isMine: true,
    status: "read",
  },
  {
    id: "5",
    text: "By the way, did you see the new post I shared?",
    time: "10:40 AM",
    isMine: false,
  },
  {
    id: "6",
    text: "Not yet! Let me check it out",
    time: "10:41 AM",
    isMine: true,
    status: "delivered",
  },
  {
    id: "7",
    text: "It's about the trip we took last month. Some really nice photos!",
    time: "10:42 AM",
    isMine: false,
  },
  {
    id: "8",
    text: "Oh nice! I loved that trip. The sunset photos were incredible 📸",
    time: "10:45 AM",
    isMine: true,
    status: "read",
  },
];

const Chat: React.FC = () => {
  const navigate = useRouter();
  const { userId } = useParams<{ userId: string }>();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const user = mockUsers[userId || "1"] || mockUsers["1"];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      isMine: true,
      status: "sent",
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col max-w-xl mx-auto border-r border-l">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-nav border-b border-border/50 bg-white">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate.back()}
              className="p-2 -ml-2 hover:bg-muted/50 rounded-full transition-colors"
            >
              <BackIcon />
            </button>

            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {user.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>
              <div>
                <h1 className="font-semibold leading-tight">{user.name}</h1>
                <p className="text-xs text-muted-foreground">
                  {user.isOnline ? "Active now" : `Last seen ${user.lastSeen}`}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-muted/50 rounded-full transition-colors">
              <PhoneIcon />
            </button>
            <button className="p-2 hover:bg-muted/50 rounded-full transition-colors">
              <VideoIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((message, index) => {
          const showAvatar =
            !message.isMine && (index === 0 || messages[index - 1].isMine);

          return (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${
                message.isMine ? "justify-end" : "justify-start"
              }`}
            >
              {!message.isMine && (
                <div className="w-8 h-8 flex-shrink-0">
                  {showAvatar && (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                </div>
              )}

              <div
                className={`max-w-[75%] ${message.isMine ? "order-first" : ""}`}
              >
                <div
                  className={`px-4 py-2.5 rounded-2xl ${
                    message.isMine
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
                <div
                  className={`flex items-center gap-1 mt-1 ${
                    message.isMine ? "justify-end" : "justify-start"
                  }`}
                >
                  <span className="text-[10px] text-muted-foreground">
                    {message.time}
                  </span>
                  {message.isMine && message.status && (
                    <DoubleCheckIcon read={message.status === "read"} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 glass-nav border-t border-border/50 px-4 py-3 bg-white">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-muted/50 rounded-full transition-colors text-muted-foreground">
            <ImageIcon />
          </button>

          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full bg-muted/50 rounded-full py-2.5 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          {newMessage.trim() ? (
            <button
              onClick={handleSend}
              className="p-2.5 bg-primary rounded-full text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <SendIcon />
            </button>
          ) : (
            <button className="p-2 hover:bg-muted/50 rounded-full transition-colors text-muted-foreground">
              <MicIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
