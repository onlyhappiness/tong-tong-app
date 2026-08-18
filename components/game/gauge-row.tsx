import { Colors, Spacing } from "@/constants/theme";
import { type ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type GaugeRowProps = {
  /** "배고픔" · "친밀도". T6에서 이 앞에 16×16 아이콘이 붙는다. */
  label: string;
  /** 오른쪽 끝에 붙는 숫자. */
  value: number;
  /** 칸들. FoodBowl·HeartRow가 넘긴다. */
  children: ReactNode;
};

/**
 * 게이지 한 줄의 배치. 라벨 · 칸 · 숫자를 한 줄에 놓는다.
 *
 */
export function GaugeRow({ label, value, children }: GaugeRowProps) {
  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.cells}>{children}</View>
      <Text style={styles.value} selectable>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
  },
  label: {
    // 폭을 고정해야 두 줄의 칸이 세로로 맞는다.
    width: 44,
    color: Colors.panelTextSecondary,
    fontSize: 12,
    fontWeight: "700",
  },
  cells: {
    // flex를 주지 않는다. 카드가 내용만큼만 차지해야 하는데,
    // 여기서 늘어나면 카드가 화면 폭까지 벌어진다.
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.half,
  },
  value: {
    minWidth: 26,
    textAlign: "right",
    color: Colors.text,
    fontSize: 13,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
});
