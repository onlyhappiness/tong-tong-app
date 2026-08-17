import { queryClient } from "@/api/query-client";
import { useAuthStore } from "@/stores/auth-store";
import { focusManager, QueryClientProvider } from "@tanstack/react-query";
import { DefaultTheme, SplashScreen, Stack, ThemeProvider } from "expo-router";
import { useEffect } from "react";
import { AppState } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    useAuthStore.getState().checkSession();
  }, []);

  useAppFocus();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={DefaultTheme}>
        <SplashScreenController />
        <RootNavigation />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

/**
 * 앱이 다시 앞으로 나올 때 낡은 데이터를 새로 가져오게 함.
 */
function useAppFocus() {
  useEffect(() => {
    if (process.env.EXPO_OS === "web") return;

    const subscription = AppState.addEventListener("change", (status) => {
      focusManager.setFocused(status === "active");
    });

    return () => subscription.remove();
  }, []);
}

function SplashScreenController() {
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hide();
    }
  }, [isLoading]);

  return null;
}

/**
 * 최상위 스택
 */
function RootNavigation() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(game)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}
