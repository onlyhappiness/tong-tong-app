import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <>
      <StatusBar backgroundColor="#ffffff" translucent={true} style="dark" />
      <Stack>
        <Stack.Screen name="game" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
