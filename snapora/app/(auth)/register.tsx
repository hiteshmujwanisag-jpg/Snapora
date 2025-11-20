import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Register() {
  const router:any = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Register</Text>

      <TextInput placeholder="Email" style={{ borderWidth: 1, marginTop: 20 }} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={{ borderWidth: 1, marginTop: 10 }}
      />

      <Button title="Register" onPress={() => router.replace("/(auth)/login")} />
    </View>
  );
}
