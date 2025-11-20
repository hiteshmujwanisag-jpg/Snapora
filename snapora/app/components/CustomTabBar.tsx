import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CustomTabBar({ state, descriptors, navigation }:any) {
  return (
    <View style={styles.container}>
      {state.routes.map((route:any, index:any) => {
        const isFocused = state.index === index;

        // Special MIDDLE BUTTON (big)
        if (route.name === "add") {
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={styles.middleButtonContainer}
            >
              <View style={styles.middleButton}>
                <Ionicons name="add" size={32} color="#fff" />
              </View>
            </TouchableOpacity>
          );
        }

        // Normal tabs
        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tab}
          >
            <Text style={[styles.label, isFocused && styles.active]}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#111",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },

  tab: {
    flex: 1,
    alignItems: "center",
  },

  label: {
    color: "#888",
    fontSize: 12,
  },

  active: {
    color: "#fff",
    fontWeight: "bold",
  },

  // ★ Big Middle Button
  middleButtonContainer: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -35 }],
    bottom: 10,
    zIndex: 10,
  },

  middleButton: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: "#ff4757",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
