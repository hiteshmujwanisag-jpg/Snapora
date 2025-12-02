import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { deleteItem } from "@/app/utils/storage";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "@/store/slice/authSlice";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Bookmark,
  Clapperboard,
  Grid3X3,
  MoreVertical,
  Tag,
} from "lucide-react-native";

export default function Profile() {
  const router: any = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  const gridImages = [
    require("@/assets/grid-1.jpg"),
    require("@/assets/grid-1.jpg"),
    require("@/assets/grid-1.jpg"),
    require("@/assets/grid-1.jpg"),
    require("@/assets/grid-1.jpg"),
    require("@/assets/grid-1.jpg"),
    require("@/assets/grid-1.jpg"),
    require("@/assets/grid-1.jpg"),
    require("@/assets/grid-1.jpg"),
  ];

  async function handleLogout() {
    await deleteItem("token");
    await deleteItem("user");
    dispatch(logoutAction());
    router.replace("/(auth)/login");
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Cover Image + Header */}
      <View className="relative h-[220px]">
        <Image
          source={require("@/assets/cover-bg.jpg")}
          className="w-full h-full object-cover"
        />

        {/* Header */}
        <View className="absolute top-4 left-4 right-4 flex-row justify-between items-center mt-16">
          <TouchableOpacity className="w-8 h-8 bg-white rounded-lg justify-center items-center shadow">
            <ArrowLeft size={20} color="#000" />
          </TouchableOpacity>

          <View className="h-8 bg-white rounded-lg px-4 justify-center items-center shadow">
            <Text className="font-bold text-lg">hxxitesh</Text>
          </View>

          <TouchableOpacity className="w-8 h-8 bg-white rounded-lg justify-center items-center shadow">
            <MoreVertical size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Section */}
      <View className="px-4 pb-4">
        {/* Avatar + Stats */}
        <View className="flex-row items-end -mt-12">
          {/* Avatar */}
          <View className="w-28 h-28 rounded-lg overflow-hidden border-4 border-white">
            <Image
              source={require("@/assets/grid-1.jpg")}
              className="w-full h-full object-cover"
            />
          </View>

          {/* Stats */}
          <View className="flex-1 flex-row justify-around ml-3 mb-1">
            <View className="items-center">
              <Text className="text-2xl font-black">145</Text>
              <Text className="text-base text-gray-700">Posts</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-black">1.2k</Text>
              <Text className="text-base text-gray-700">Followers</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-black">200</Text>
              <Text className="text-base text-gray-700">Following</Text>
            </View>
          </View>
        </View>

        {/* Bio */}
        <View className="mt-4">
          <Text className="text-lg font-medium">
            Full Stack Developer | Freelancer | Content Creator
          </Text>
          <Text className="text-lg font-medium">
            Nothing is fine but everything is gonna be fine
          </Text>
          <Text className="text-lg font-medium">Dm for work or mail</Text>

          <Text className="text-lg font-medium text-blue-600">
            Hiteshmujwani@gmail.com
          </Text>
        </View>

        {/* Buttons */}
        <View className="flex-row gap-2 mt-4">
          <TouchableOpacity className="flex-1 bg-primarySolid border-black border py-2 rounded-lg">
            <Text className="text-black text-center font-bold text-lg">
              Follow
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 border border-black bg-primarySolid py-2 rounded-lg">
            <Text className="text-black text-center font-bold text-lg">
              Message
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row border-t border-gray-200">
        {[
          { icon: Grid3X3, id: 0 },
          { icon: Clapperboard, id: 1 },
          { icon: Tag, id: 2 },
          { icon: Bookmark, id: 3 },
        ].map(({ icon: Icon, id }) => (
          <TouchableOpacity
            key={id}
            onPress={() => setActiveTab(id)}
            className={`flex-1 py-3 items-center border-b-2 ${
              activeTab === id
                ? "border-black"
                : "border-transparent opacity-50"
            }`}
          >
            <Icon size={26} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Grid */}
      <View className="flex-row flex-wrap">
        {gridImages.map((img: any, idx: any) => (
          <View key={idx} className="w-1/3 aspect-square p-[0.5px] bg-gray-200">
            <Image source={img} className="w-full h-full object-cover" />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
