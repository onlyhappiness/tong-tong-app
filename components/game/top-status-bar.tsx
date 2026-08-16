import { Ramp, Spacing } from "@/constants/theme";
import { isDaytime } from "@/utils/game-time";
import { StyleSheet, Text, View } from "react-native";

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
      <Text style={[styles.text, styles.coins]} selectable>
        {coins.toLocaleString("ko-KR")} 코인
      </Text>
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
  coins: {
    fontVariant: ["tabular-nums"],
  },
});
