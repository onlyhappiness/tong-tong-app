import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors, Fonts, Spacing } from "@/constants/theme";
import { useAuthStore } from "@/stores/auth-store";

/**
 * 설정. 지금은 계정 정보와 로그아웃뿐이다.
 *
 * 탭바를 없애면서 로그아웃이 갈 곳이 없어져 이 화면으로 옮겼다.
 * M3의 관리자 기능과는 무관하다 — 여기는 게임 유저용이다.
 */
export default function SettingsScreen() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>설정</Text>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Text style={styles.close}>닫기</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>계정</Text>
          <Text style={styles.value} selectable>
            {user?.email ?? "—"}
          </Text>
        </View>

        <Pressable onPress={logout} style={styles.logout} hitSlop={8}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.five,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Spacing.four,
  },
  title: {
    color: Colors.text,
    fontFamily: Fonts?.rounded,
    fontSize: 22,
    fontWeight: "800",
  },
  close: {
    color: Colors.textSecondary,
    fontSize: 15,
  },
  section: {
    gap: Spacing.one,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  value: {
    color: Colors.text,
    fontSize: 16,
  },
  logout: {
    alignSelf: "flex-start",
  },
  logoutText: {
    color: Colors.danger,
    fontSize: 15,
    fontWeight: "700",
  },
});
