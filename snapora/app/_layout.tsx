import { Slot } from "expo-router";
import "../global.css";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useFonts } from "expo-font";
import { StatusBar } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [fontsLoaded] = useFonts({
    PlayfairRegular: require("../assets/fonts/PlayfairDisplay-Regular.ttf"),
    PlayfairMedium: require("../assets/fonts/PlayfairDisplay-Medium.ttf"),
    PlayfairSemiBold: require("../assets/fonts/PlayfairDisplay-SemiBold.ttf"),
    PlayfairBold: require("../assets/fonts/PlayfairDisplay-Bold.ttf"),
    DMSansRegular: require("../assets/fonts/DMSans-Regular.ttf"),
    DMSansMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMSansSemiBold: require("../assets/fonts/DMSans-SemiBold.ttf"),
    DMSansBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMSansItalic: require("../assets/fonts/DMSans-Italic.ttf"),
    DMSansMediumItalic: require("../assets/fonts/DMSans-MediumItalic.ttf"),
    DMSansSemiBoldItalic: require("../assets/fonts/DMSans-SemiBoldItalic.ttf"),
    DMSansBoldItalic: require("../assets/fonts/DMSans-BoldItalic.ttf"),
  });

  useEffect(() => {
    const prepare = async () => {
      await new Promise((res) => setTimeout(res, 2000));
      setReady(true);
      await SplashScreen.hideAsync();
    };

    prepare();
  }, []);

  if (!ready) return null;

  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
