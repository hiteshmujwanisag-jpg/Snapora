import { Slot, Stack } from "expo-router";
import "../global.css";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { getItem } from "./utils/storage"; // SecureStore wrapper

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [onboarded, setOnboarded] = useState<boolean | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      await new Promise(res => setTimeout(res, 2000));

      const o = await getItem("onboarded");
      const t = await getItem("token");

      setOnboarded(!!o);
      setToken(t);

      setReady(true);
      await SplashScreen.hideAsync();
    }

    load();
  }, []);

  if (!ready) return null;

  /** ⭐ ONBOARDING ROUTE GROUP */
  if (!onboarded) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(onboarding)" />
      </Stack>
    );
  }

  /** ⭐ AUTH ROUTE GROUP */
  if (!token) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
      </Stack>
    );
  }

  /** ⭐ APP TAB ROUTES */
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(app)" />
    </Stack>
  );
}
