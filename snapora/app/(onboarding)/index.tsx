import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { setItem } from "../utils/storage";

export default function Onboarding() {
  const router:any = useRouter();

  async function finish() {
    await setItem("onboarded", "true");
    router.replace("/(auth)/login");
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>
        Welcome to MyApp
      </Text>

      <Button title="Get Started" onPress={finish} />
    </View>
  );
}
