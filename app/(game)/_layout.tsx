import { Redirect, Stack } from "expo-router";

import { useAuthStore } from "@/stores/auth-store";

/**
 * 인증된 사용자에게만 노출되는 게임 화면 그룹.
 *
 * 탭바를 두지 않는다 — M1은 화면이 펫 하나뿐이라 탭이 고를 것이 없다.
 * 설정은 스택으로 밀어 올려 뒤로가기 제스처로 닫는다.
 */
export default function GameLayout() {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="settings" options={{ presentation: "modal" }} />
    </Stack>
  );
}
