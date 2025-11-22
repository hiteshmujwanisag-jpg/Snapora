import { View, Text, Button, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { setItem } from "../utils/storage";
import { useDispatch } from "react-redux";
import { setOnboarding } from "@/store/slice/authSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomCarosuel from "../components/CustomCarosuel";

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
      <View className="p-3 ">
        <View className="">
          <Text className="text-3xl font-bold">Snapora</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
