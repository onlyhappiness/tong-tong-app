import GameProvider from "@/providers/game-provider";
import { Stack } from "expo-router";

export default function GameLayout() {
  return (
    <GameProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </GameProvider>
  );
}
