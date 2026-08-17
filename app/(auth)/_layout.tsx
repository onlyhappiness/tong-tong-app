import { Redirect, Stack } from 'expo-router';

import { useAuthStore } from '@/stores/auth-store';

export const unstable_settings = {
  initialRouteName: 'login',
};

/**
 * 로그인·회원가입 화면 그룹. 초기 진입점은 login.
 * 이미 로그인된 사용자는 탭 화면으로 리다이렉트한다.
 */
export default function AuthLayout() {
  const user = useAuthStore((s) => s.user);

  if (user) {
    return <Redirect href="/(game)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
