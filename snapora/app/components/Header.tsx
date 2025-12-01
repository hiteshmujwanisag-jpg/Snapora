import { Icon } from "@/components/ui/icon";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Inbox from "../../assets/icons/Inbox.svg";

const Header = () => {
  const notificationCount = 199;
  return (
    <View className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <View className="max-w-xl  px-4 h-16 flex-row items-center justify-between">
        {/* Left: Logo + Title */}
        <View className="flex-row items-center gap-2">
          <Image
            source={require("../../assets/images/icon.png")}
            className="!h-8 !w-8 rounded-md"
          />
          <Text className="text-2xl font-bold text-black">Snapora</Text>
        </View>

        {/* Notifications */}
        <TouchableOpacity className="relative p-2 rounded-lg active:bg-gray-200">
          <Inbox />
          {notificationCount > 0 && (
            <View className="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-red-400">
              <Text className="text-xs font-semibold text-white">
                {notificationCount > 99 ? "99" : notificationCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
