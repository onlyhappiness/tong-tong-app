import { Redirect, Stack } from 'expo-router';

import { useAuthStore } from '@/stores/auth-store';

export const unstable_settings = {
  initialRouteName: 'login',
};

export default function AuthLayout() {
  const user = useAuthStore((s) => s.user);

  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
