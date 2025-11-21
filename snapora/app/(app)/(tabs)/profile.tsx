import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { deleteItem } from "@/app/utils/storage";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "@/store/slice/authSlice";

export default function Profile() {
  const router: any = useRouter();
  const dispatch = useDispatch();

  async function handleLogout() {
    await deleteItem("token");
    await deleteItem("user");
    dispatch(logoutAction());
    router.replace("/(auth)/login");
  }

  return (
    <View>
      <Text className="mt-10">Profile Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
