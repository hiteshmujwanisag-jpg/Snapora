import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

// ---------------- ICONS -----------------

import Svg, { Path, Circle, Line } from "react-native-svg";
import { router } from "expo-router";
import { ChevronRightIcon } from "lucide-react-native";

const BackIcon = () => (
  <Svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2}>
    <Path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ---------------- DATA -----------------

const followRequests = [
  {
    id: "fr1",
    user: {
      name: "Emma Wilson",
      username: "emmaw",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
  },
  {
    id: "fr2",
    user: {
      name: "James Miller",
      username: "jamesmiller",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
  },
];

const todayNotifications = [
  {
    id: "1",
    type: "like",
    user: {
      name: "Sarah Connor",
      username: "sarahc",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    postImage: "https://picsum.photos/seed/post1/200",
    time: "2h",
  },
  {
    id: "2",
    type: "comment",
    user: {
      name: "Mike Johnson",
      username: "mikej",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    postImage: "https://picsum.photos/seed/post2/200",
    comment: "This is amazing! 🔥",
    time: "3h",
  },
  {
    id: "3",
    type: "follow",
    user: {
      name: "Lisa Park",
      username: "lisapark",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
    time: "5h",
  },
];

const yesterdayNotifications: any = [];
const thisWeekNotifications: any = [];

// ---------------- COMPONENTS -----------------

const NotificationItem = ({ notification }: any) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const getText = () => {
    if (notification.type === "like") return "liked your post";
    if (notification.type === "comment")
      return `commented: ${notification.comment}`;
    return "started following you";
  };

  return (
    <View className="flex-row items-center gap-3 px-4 py-3 border-b border-gray-200">
      {/* Avatar */}
      <View className="relative">
        <Image
          source={{ uri: notification.user.avatar }}
          className="h-11 w-11 rounded-full"
        />
      </View>

      {/* Text */}
      <View className="flex-1">
        <Text className="text-md">
          <Text className="font-semibold">{notification.user.name} </Text>
          {getText()} <Text className="text-gray-400">{notification.time}</Text>
        </Text>
      </View>

      {/* Post Image OR Follow Button */}
      {notification.type === "follow" ? (
        <Pressable
          onPress={() => setIsFollowing(!isFollowing)}
          className={`px-6 py-2 rounded-lg ${
            isFollowing
              ? "bg-gray-200 border-black border"
              : "bg-primarySolid border-black border"
          }`}
        >
          <Text
            className={`text-xs font-semibold ${
              isFollowing ? "text-black" : "text-black"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </Text>
        </Pressable>
      ) : (
        <Image
          source={{ uri: notification.postImage }}
          className="h-11 w-11 rounded-lg"
        />
      )}
    </View>
  );
};

const FollowRequestsSection = () => {
  const navigation = useNavigation();

  return (
    <Pressable className="bg-white border-b border-gray-200">
      <View className="flex-row items-center gap-3 px-4 py-3">
        {/* stacked avatars */}
        <View className="flex-row -space-x-3">
          {followRequests.slice(0, 3).map((rq, i) => (
            <View
              key={rq.id}
              className={`h-12 w-12 rounded-full overflow-hidden border-2 border-white ${
                i === 0 ? "z-10" : i === 1 ? "z-0" : "z-0"
              }`}
              style={{ marginLeft: i === 0 ? 0 : -12 }}
            >
              <Image
                source={{ uri: rq.user.avatar }}
                className="h-full w-full"
              />
            </View>
          ))}
        </View>

        <View className="flex-1">
          <Text className="font-semibold text-md">Follow requests</Text>
          <Text className="text-sm text-gray-500">
            {followRequests[0].user.username} + {followRequests.length - 1}{" "}
            others
          </Text>
        </View>

        <ChevronRightIcon />
      </View>
    </Pressable>
  );
};

const NotificationSection = ({ title, data }: any) => {
  if (data.length === 0) return null;
  return (
    <View className="mb-2">
      <Text className="px-4 py-2 text-md font-bold">{title}</Text>
      {data.map((n: any) => (
        <NotificationItem key={n.id} notification={n} />
      ))}
    </View>
  );
};

// ---------------- MAIN SCREEN -----------------

export default function Notifications() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center gap-4 px-4 h-14 border-b border-gray-200">
        <Pressable onPress={() => router.back()}>
          <BackIcon />
        </Pressable>
        <Text className="text-xl font-semibold">Notifications</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <FollowRequestsSection />
        <NotificationSection title="Today" data={todayNotifications} />
        <NotificationSection title="Yesterday" data={todayNotifications} />
        <NotificationSection title="This Week" data={todayNotifications} />
      </ScrollView>
    </SafeAreaView>
  );
}
