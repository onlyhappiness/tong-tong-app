import { Ramp, Spacing } from "@/constants/theme";
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
          color={day ? Ramp.gold[5] : Ramp.neutral[8]}
        />
        <Text style={[styles.text, styles.number]}>{time}</Text>
      </View>

      <Text style={[styles.text, styles.weekday]}>{weekday}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "flex-end",
    gap: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.one,
  },
  text: {
    color: Ramp.neutral[9],
    fontSize: 13,
    fontWeight: "700",
    // 잔디 위에서 글자 테두리에 어두운 띠를 만든다. 검정이 아니라 grass[0]이라
    // 팔레트 안에 머문다.
    textShadowColor: "rgba(47, 79, 60, 0.85)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  number: {
    fontVariant: ["tabular-nums"],
  },
  weekday: {
    fontSize: 12,
    marginTop: Spacing.half,
  },
});
