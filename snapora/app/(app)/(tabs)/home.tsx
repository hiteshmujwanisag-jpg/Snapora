import { Button } from "@/components/ui/button";
import { View, Text } from "react-native";

export default function Home() {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button className="bg-main">
        <Text>Home</Text>
      </Button>
    </View>
  );
}
