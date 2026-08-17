import { Ramp, Spacing } from "@/constants/theme";
import { isDaytime } from "@/utils/game-time";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type TopStatusBarProps = {
  now: Date;
  coins: number;
};

/**
 * 하늘 위에 얹히는 상단 바. 낮·밤 표시와 코인 잔액을 보여준다.
 */
export function TopStatusBar({ now, coins }: TopStatusBarProps) {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{isDaytime(now) ? "낮" : "밤"}</Text>

      <View style={styles.right}>
        <Text style={[styles.text, styles.coins]} selectable>
          {coins.toLocaleString("ko-KR")} 코인
        </Text>

        {/* 탭바를 없애면서 설정으로 갈 길이 여기 하나만 남았다. */}
        <Link href="/settings" asChild>
          <Pressable hitSlop={12}>
            <Text style={styles.text}>설정</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
  },
  text: {
    // 하늘 위에 얹히므로 밝은 글자여야 한다. Colors.text(진한 초록)는 밤에 묻힌다.
    color: Ramp.neutral[9],
    fontSize: 13,
    fontWeight: "700",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.three,
  },
  coins: {
    fontVariant: ["tabular-nums"],
  },
});
