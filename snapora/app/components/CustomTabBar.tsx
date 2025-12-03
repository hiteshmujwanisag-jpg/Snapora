import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import Home from "@/assets/icons/Home.svg";
import Create from "@/assets/icons/Create.svg";
import Explore from "@/assets/icons/Explore.svg";
import Shorts from "@/assets/icons/Shorts.svg";
import Profile from "@/assets/icons/Dashboard.svg";

export default function CustomTabBar({ state, descriptors, navigation }: any) {
  return (
    <View className="flex-row justify-between bg-white  pt-4 h-20 px-10">
      {state.routes.map((route: any, index: any) => {
        const isFocused = state.index === index;
        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            className=""
          >
            {route.name === "home" ? (
              <Home height={28} width={28} />
            ) : route.name === "add" ? (
              <Create height={28} width={28} />
            ) : route.name === "profile" ? (
              <Profile height={28} width={28} />
            ) : route.name === "explore" ? (
              <Explore height={28} width={28} />
            ) : route.name === "shorts" ? (
              <Shorts height={28} width={28} />
            ) : (
              ""
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
