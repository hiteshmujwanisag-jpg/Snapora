import { Slot, Stack } from "expo-router";
import "../global.css";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getItem } from "./utils/storage"; // SecureStore wrapper
import { loadUserFromStorage } from "@/store/slice/authSlice";
import { store } from "@/store/store";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const { user, loading, onboarding, token } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    async function load() {
      await new Promise((res) => setTimeout(res, 2000));

      dispatch(loadUserFromStorage());
      setReady(true);
      await SplashScreen.hideAsync();
    }

    load();
  }, []);

  if (!ready) return null;

  /** ⭐ ONBOARDING ROUTE GROUP */
  if (!onboarding) {
    return (
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(onboarding)" />
        </Stack>
      </Provider>
    );
  }

  /** ⭐ AUTH ROUTE GROUP */
  if (!token) {
    return (
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
        </Stack>
      </Provider>
    );
  }

  /** ⭐ APP TAB ROUTES */
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(app)" />
      </Stack>
    </Provider>
  );
}
