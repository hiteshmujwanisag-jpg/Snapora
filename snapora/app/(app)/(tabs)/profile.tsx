import { View, Text, Button } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { deleteItem } from "@/app/utils/storage";

export default function Profile() {
  const router:any = useRouter();

  async function logout() {
    await deleteItem("token");
    router.replace("/(auth)/login");
  }

  return (
    <View>
      <Text>Profile Screen</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
