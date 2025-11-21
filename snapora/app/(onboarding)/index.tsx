import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { setItem } from "../utils/storage";
import { useDispatch } from "react-redux";
import { setOnboarding } from "@/store/slice/authSlice";

export default function Onboarding() {
  const router: any = useRouter();
  const dispatch = useDispatch();

  async function finish() {
    await setItem("onboarded", "true");
    dispatch(setOnboarding(true));
    router.replace("/(auth)/login");
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>Welcome to MyApp</Text>
      
      <Button title="Get Started" onPress={finish} />
    </View>
  );
}
