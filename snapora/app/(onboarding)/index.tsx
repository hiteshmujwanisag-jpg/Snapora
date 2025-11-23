import { View, Text, Button, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { setItem } from "../utils/storage";
import { useDispatch } from "react-redux";
import { setOnboarding } from "@/store/slice/authSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomCarosuel from "../components/CustomCarosuel";
import { Image } from "@/components/ui/image";

export default function Onboarding() {
  const router: any = useRouter();
  const dispatch = useDispatch();

  async function finish() {
    await setItem("onboarded", "true");
    dispatch(setOnboarding(true));
    router.replace("/(auth)/login");
  }

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="p-3">
        <View className="">
          <View className="flex flex-row gap-2 items-center">
            <Image
              source={require("@/assets/images/icon.png")}
              size="xs"
              className="rounded-md"
            />
            <Text className="text-4xl font-bold font-playfairBold">
              Snapora
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
