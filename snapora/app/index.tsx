import { Text, View } from "react-native";
import { Button, ButtonText } from '@/components/ui/button';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button variant="solid" size="md" className="bg-white">
      <ButtonText>Home</ButtonText>
    </Button>
    </View>
  );
}
