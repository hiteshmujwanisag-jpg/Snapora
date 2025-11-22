import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { setItem } from "../utils/storage";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slice/authSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomCarosuel from "../components/CustomCarosuel";

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
    <SafeAreaView>
      <View>
        <Text style={{ fontSize: 22 }}>Login</Text>

        <TextInput placeholder="Email" />
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
    </SafeAreaView>
  );
}
