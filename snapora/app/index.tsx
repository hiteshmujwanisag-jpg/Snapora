import { loadUserFromStorage } from "@/store/slice/authSlice";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { onboarding, token, loading } = useSelector(
    (state: any) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!onboarding) {
    return <Redirect href="/(onboarding)" />;
  }

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(app)/(tabs)/home" />;
}
