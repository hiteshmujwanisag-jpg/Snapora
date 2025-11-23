import { Slot } from "expo-router";
import "../global.css";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [fontsLoaded] = useFonts({
    PlayfairRegular: require("../assets/fonts/PlayfairDisplay-Regular.ttf"),
    PlayfairMedium: require("../assets/fonts/PlayfairDisplay-Medium.ttf"),
    PlayfairSemiBold: require("../assets/fonts/PlayfairDisplay-SemiBold.ttf"),
    PlayfairBold: require("../assets/fonts/PlayfairDisplay-Bold.ttf"),
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
