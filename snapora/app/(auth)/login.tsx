import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { setItem } from "../utils/storage";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slice/authSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "@/components/ui/image";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const router: any = useRouter();
  const dispatch = useDispatch();

  async function handleLogin() {
    const token = "user_token";
    const user = { id: "1", email: "user@example.com" };

    await setItem("token", token);
    await setItem("user", JSON.stringify(user));

    dispatch(loginSuccess({ token, user }));
    router.replace("/(app)/(tabs)/home");
  }

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="p-5 flex justify-center flex-1">
        <View className="">
          <View className="flex flex-row gap-2 items-center">
            <Image
              source={require("@/assets/images/icon.png")}
              size={"xs"}
              className="rounded-md"
            />
            <Text className="text-3xl font-bold font-dmBold tracking-tighter">
              Snapora
            </Text>
          </View>
        </View>
        <View className="mt-3">
          <Text className="text-lg font-dmSemi">A place made for your memories and meaningful connections,</Text>
        </View>
        <View className="mt-10">
          <Text className="font-dmBold text-4xl">Welcome Back !</Text>
        </View>
        <View>
          <LoginForm/>
        </View>
      </View>
    </SafeAreaView>
  );
}
