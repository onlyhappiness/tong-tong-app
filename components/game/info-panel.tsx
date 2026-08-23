import { Card, Colors, Fonts, Ramp, Spacing } from "@/constants/theme";
import { isDaytime } from "@/utils/game-time";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

type InfoPanelProps = {
  now: Date;
  coins: number;
};

/**
 * 우측 하단 계기판. 코인 · 시각 · 요일.
 *
 */
export function InfoPanel({ now, coins }: InfoPanelProps) {
  const day = isDaytime(now);

  // 한국 전용 서비스라 기기 시간이 곧 KST다.
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const weekday = `${WEEKDAYS[now.getDay()]}요일`;

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <MaterialCommunityIcons
          name="circle-multiple"
          size={16}
          color={Ramp.gold[5]}
        />
        <Text style={[styles.text, styles.number]}>
          {coins.toLocaleString("ko-KR")}
        </Text>
      </View>

      <View style={styles.row}>
        <MaterialCommunityIcons
          name={day ? "weather-sunny" : "weather-night"}
          size={16}
          color={day ? Ramp.gold[5] : Colors.panelTextSecondary}
        />
        <Text style={[styles.text, styles.number]}>{time}</Text>
      </View>

      <Text style={[styles.text, styles.weekday]}>{weekday}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    // 다른 HUD 요소와 같은 카드. 잔디 위에 글자만 얹혀 있으면 이것만 격이 달라
    // 보이고, 잔디 색이 진해지는 시각대에는 읽기도 나빠진다.
    alignItems: "flex-end",
    gap: 2,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Card.radius,
    borderCurve: "continuous",
    borderWidth: Card.borderWidth,
    borderColor: Card.borderColor,
    backgroundColor: Colors.panel,
    boxShadow: Card.shadow,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.one,
  },
  text: {
    // 카드 위로 올라왔으므로 밝은 글자 + 그림자가 아니라 어두운 글자를 쓴다.
    color: Colors.text,
    fontFamily: Fonts?.rounded,
    // 숫자는 크게, 요일은 작게. 같은 크기로 나열하면 읽을 순서가 안 생긴다.
    fontSize: 16,
    fontWeight: "800",
  },
  number: {
    fontVariant: ["tabular-nums"],
  },
  weekday: {
    // 코인·시각보다 한 단 낮은 정보다.
    color: Colors.panelTextSecondary,
    fontSize: 11,
    marginTop: Spacing.half,
  },
});
