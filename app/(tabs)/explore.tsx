import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useAuthStore } from "@/stores/auth-store";

export default function ExploreScreen() {
  const theme = useTheme();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={[styles.title, { color: theme.text }]}>Explore</Text>

        <View style={styles.accountSection}>
          <Text style={{ color: theme.textSecondary }}>{user?.email}</Text>
          <Pressable onPress={logout}>
            <Text style={styles.logoutText}>로그아웃</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  accountSection: {
    alignItems: "center",
    gap: Spacing.two,
  },
  logoutText: {
    color: "#30A46C",
    fontSize: 14,
  },
});
