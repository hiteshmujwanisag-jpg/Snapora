import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import Svg, { Path, Circle } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchIcon } from "lucide-react-native";

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
  <Svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2}>
    <Path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const NewMessageIcon = () => (
  <Svg width={24} height={24} stroke="currentColor" strokeWidth="2" fill="none">
    <Path
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M12 8v6" strokeLinecap="round" />
    <Path d="M9 11h6" strokeLinecap="round" />
  </Svg>
);

const mockConversations: Conversation[] = [
  {
    id: "9",
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
    id: "8",
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
    id: "7",
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
    id: "6",
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
    id: "3",
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
    id: "4",
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
    id: "5",
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
    id: "10",
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
  // Add remaining mock data...
];

export default function MessagesScreen() {
  const router: any = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockConversations.filter(
    (c) =>
      c.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 -mb-10">
      <View className="flex-1 bg-background px-4">
        {/* Header */}
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 rounded-full"
            >
              <BackIcon />
            </TouchableOpacity>
            <Text className="text-xl font-semibold">Messages</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View className="mb-4 mt-4">
          <View className="relative border-black border flex-row items-center px-2 rounded-lg">
            <SearchIcon />

            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search messages"
              placeholderTextColor="#6b7280"
              className="bg-muted/30 rounded-lg px-3 py-2.5 text-sm w-full"
            />
          </View>
        </View>

        {/* Conversations */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push("/(app)/chat/99999")}
              className="flex-row items-center gap-3 py-3"
            >
              {/* Avatar */}
              <View className="relative">
                <Image
                  source={{ uri: item.user.avatar }}
                  className="w-16 h-16 rounded-full"
                />
                {item.user.isOnline && (
                  <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full" />
                )}
              </View>

              {/* Content */}
              <View className="flex-1">
                <View className="flex-row justify-between items-center">
                  <Text
                    className={`font-semibold text-lg ${
                      item.unreadCount > 0
                        ? "text-foreground"
                        : "text-foreground/80"
                    }`}
                  >
                    {item.user.name}
                  </Text>
                  <Text
                    className={`text-xs ${
                      item.unreadCount > 0
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.lastMessage.time}
                  </Text>
                </View>

                <View className="flex-row justify-between items-center">
                  <Text
                    className={`text-md flex-1 ${
                      item.unreadCount > 0
                        ? "font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.lastMessage.isMine && (
                      <Text className="text-muted-foreground">You: </Text>
                    )}
                    {item.lastMessage.text}...
                  </Text>

                  {item.unreadCount > 0 && (
                    <View className="w-5 h-5 bg-primarySolid rounded-full justify-center items-center ml-2">
                      <Text className="text-xs font-bold text-primary-foreground">
                        {item.unreadCount}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View className="items-center justify-center py-20">
              <SearchIcon />
              <Text className="text-muted-foreground mt-3">
                No conversations found
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
