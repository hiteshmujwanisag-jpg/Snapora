// app/chat/[userId].tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ListRenderItemInfo,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import Svg, {
  Path,
  Polygon,
  Rect,
  Line,
  Polyline,
  Circle,
} from "react-native-svg";

type Message = {
  id: string;
  text: string;
  time: string;
  isMine: boolean;
  status?: "sent" | "delivered" | "read";
};

type ChatUser = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
};

const BackIcon = () => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <Path d="M19 12H5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PhoneIcon = () => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <Path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const VideoIcon = () => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <Polygon points="23 7 16 12 23 17 23 7" />
    <Rect x={1} y={5} width={15} height={14} rx={2} ry={2} />
  </Svg>
);

const SendIcon = () => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <Line x1={22} y1={2} x2={11} y2={13} />
    <Polygon points="22 2 15 22 11 13 2 9 22 2" />
  </Svg>
);

const ImageIcon = () => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <Rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
    <Circle cx={8.5} cy={8.5} r={1.5} />
    <Polyline points="21 15 16 10 5 21" />
  </Svg>
);

const MicIcon = () => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <Path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <Path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <Line x1={12} y1={19} x2={12} y2={23} />
    <Line x1={8} y1={23} x2={16} y2={23} />
  </Svg>
);

const DoubleCheckIcon = ({ read }: { read: boolean }) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke={read ? "#3b82f6" : "currentColor"}
    strokeWidth={2}
  >
    <Polyline points="18 7 11 14 6 9" />
    <Polyline points="23 7 16 14 14 12" />
  </Svg>
);

// --- Mock data (kept same as your web version, adapted) ---
const mockUsers: Record<string, ChatUser> = {
  "1": {
    id: "1",
    name: "Sarah Wilson",
    username: "sarahw",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    isOnline: true,
  },
  "2": {
    id: "2",
    name: "Mike Chen",
    username: "mikechen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    isOnline: true,
  },
  "3": {
    id: "3",
    name: "Emma Roberts",
    username: "emmar",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    isOnline: false,
    lastSeen: "2h ago",
  },
};

const initialMessages: Message[] = [
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

// --- Chat screen ---
export default function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ userId?: string }>();
  const userId = params.userId ?? "1";

  const user = mockUsers[userId] ?? mockUsers["1"];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const flatListRef = useRef<FlatList<Message> | null>(null);

  // auto scroll to bottom when messages change
  useEffect(() => {
    // small delay to ensure layout measured
    const t = setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 50);
    return () => clearTimeout(t);
  }, [messages]);

  const handleSend = () => {
    const trimmed = newMessage.trim();
    if (!trimmed) return;

    const msg: Message = {
      id: Date.now().toString(),
      text: trimmed,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      isMine: true,
      status: "sent",
    };

    setMessages((p) => [...p, msg]);
    setNewMessage("");
  };

  const handleKeyPressSend = (_text: string) => {
    // on mobile we send via button only (TextInput 'onSubmitEditing' can be wired if desired)
  };

  const renderMessage = ({ item, index }: ListRenderItemInfo<Message>) => {
    // show avatar for incoming messages when previous message was mine or it's the first
    const showAvatar =
      !item.isMine && (index === 0 || messages[index - 1].isMine);

    return (
      <View
        style={{
          flexDirection: "row",
          marginVertical: 6,
          alignItems: "flex-start",
          justifyContent: item.isMine ? "flex-end" : "flex-start",
        }}
      >
        {!item.isMine && (
          <View style={{ width: 36, marginRight: 8 }}>
            {showAvatar ? (
              <Image
                source={{ uri: user.avatar }}
                style={{ width: 36, height: 36, borderRadius: 18 }}
              />
            ) : (
              <View style={{ width: 36, height: 36 }} />
            )}
          </View>
        )}

        <View
          style={{
            maxWidth: "78%",
            alignItems: item.isMine ? "flex-end" : "flex-start",
          }}
        >
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: 20,
              backgroundColor: item.isMine ? "#F1FF22" : "#F3F4F6", // primary / muted
              borderTopRightRadius: item.isMine ? 6 : 20,
              borderTopLeftRadius: item.isMine ? 20 : 6,
            }}
          >
            <Text
              style={{
                color: item.isMine ? "#111827" : "#111827",
                lineHeight: 20,
              }}
            >
              {item.text}
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}
          >
            <Text style={{ fontSize: 10, color: "#6B7280", marginRight: 6 }}>
              {item.time}
            </Text>
            {item.isMine && item.status && (
              <DoubleCheckIcon read={item.status === "read"} />
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0,0,0,0.06)",
            paddingVertical: 12,
            paddingHorizontal: 14,
            backgroundColor: "#fff",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ padding: 8 }}
            >
              <BackIcon />
            </TouchableOpacity>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <View style={{ position: "relative" }}>
                <Image
                  source={{ uri: user.avatar }}
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                />
                {user.isOnline && (
                  <View
                    style={{
                      position: "absolute",
                      right: -2,
                      bottom: -2,
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: "#10B981",
                      borderWidth: 2,
                      borderColor: "#fff",
                    }}
                  />
                )}
              </View>

              <View>
                <Text style={{ fontWeight: "600", fontSize: 16 }}>
                  {user.name}
                </Text>
                <Text style={{ fontSize: 12, color: "#6B7280" }}>
                  {user.isOnline
                    ? "Active now"
                    : `Last seen ${user.lastSeen ?? "some time ago"}`}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <TouchableOpacity style={{ padding: 8 }}>
              <PhoneIcon />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 8 }}>
              <VideoIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages list */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={{
            paddingHorizontal: 14,
            paddingVertical: 12,
            paddingBottom: 24,
          }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          showsVerticalScrollIndicator={false}
          // invert behavior not used; we scroll to end instead
        />

        {/* Input area */}
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: "rgba(0,0,0,0.06)",
            padding: 10,
            backgroundColor: "#fff",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <TouchableOpacity style={{ padding: 8 }}>
              <ImageIcon />
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
              <TextInput
                value={newMessage}
                onChangeText={setNewMessage}
                placeholder="Message..."
                placeholderTextColor="#9CA3AF"
                onSubmitEditing={() => handleKeyPressSend(newMessage)}
                returnKeyType="send"
                style={{
                  backgroundColor: "#F3F4F6",
                  paddingVertical: Platform.OS === "ios" ? 12 : 8,
                  paddingHorizontal: 14,
                  borderRadius: 24,
                  fontSize: 15,
                }}
              />
            </View>

            {newMessage.trim() ? (
              <TouchableOpacity
                onPress={handleSend}
                style={{
                  backgroundColor: "#2563EB",
                  padding: 12,
                  borderRadius: 24,
                }}
              >
                <SendIcon />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={{ padding: 10 }}>
                <MicIcon />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
