import { Icon } from "@/components/ui/icon";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import Inbox from "../../assets/icons/Inbox.svg";
import { Heart } from "lucide-react-native";
import { router } from "expo-router";

const Header = () => {
  const notificationCount = 199;
  return (
    <View className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <View className="max-w-xl px-3 h-16 flex-row items-center justify-between">
        {/* Left: Logo + Title */}
        <View className="flex-row items-center gap-2">
          <Image
            source={require("../../assets/images/icon.png")}
            className="!h-8 !w-8 rounded-md"
          />
          <Text className="text-2xl font-bold text-black">Snapora</Text>
        </View>

        {/* Notifications */}
        <View className="flex-row items-center">
          <Pressable
            onPress={() => router.push("/(app)/messages")}
            className="relative p-2 rounded-lg active:bg-gray-200"
          >
            <Inbox />
          </Pressable>
          <Pressable
            className="relative p-2 rounded-lg active:bg-gray-200"
            onPress={() => router.push("/(app)/notifications")}
          >
            <Heart />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Header;
