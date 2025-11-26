import { Button } from "@/components/ui/button";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function Home() {
  const { user, token } = useSelector((state: any) => state.auth);
  return (
    <SafeAreaView className="flex-1">
      <View>
        <Text>welcome , {user?.username}</Text>
      </View>
    </SafeAreaView>
  );
}
