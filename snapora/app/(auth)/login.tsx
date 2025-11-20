import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { setItem } from "../utils/storage";

export default function Login() {
  const router: any = useRouter();

  async function handleLogin() {
    await setItem("token", "user_token");
    router.replace("/(app)/(tabs)/home");
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Login</Text>

      <TextInput
        placeholder="Email"
        style={{ borderWidth: 1, marginTop: 20 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={{ borderWidth: 1, marginTop: 10 }}
      />

      <Button title="Login" onPress={handleLogin} />

      <Button
        title="Create Account"
        onPress={() => router.push("/(auth)/register")}
      />
    </View>
  );
}
