import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "@/components/ui/image";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="p-5 flex-1 mt-5">
        <View className="flex-row gap-2 items-center">
          <Image
            source={require("@/assets/images/icon.png")}
            size="xs"
            className="rounded-md"
          />
          <Text className="text-3xl font-dmBold tracking-tighter">Snapora</Text>
        </View>

        <View className="mt-3">
          <Text className="text-xl font-dmSemi">
            A place made for your memories and meaningful connections
          </Text>
        </View>

        <View className="mt-10">
          <Text className="font-dmBold text-4xl">Create Account</Text>
        </View>

        <RegisterForm />
      </View>
    </SafeAreaView>
  );
}
