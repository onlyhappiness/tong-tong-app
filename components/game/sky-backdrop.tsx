import { Ramp } from "@/constants/theme";
import {
  GAME_DAY_START_HOUR,
  isDaytime,
  kstHour,
  NIGHT_START_HOUR,
} from "@/utils/game-time";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

type SkyBackdropProps = {
  now: Date;
};

/**
 * 하늘 색 세 겹. 위가 짙고 아래로 갈수록 옅다 —
 *
 */
export function skyBands(now: Date): readonly [string, string, string] {
  return isDaytime(now)
    ? [Ramp.sky[3], Ramp.sky[4], Ramp.sky[5]]
    : [Ramp.sky[0], Ramp.sky[1], Ramp.sky[2]];
}

/**
 * 색이 바뀌는 지점. 위쪽을 넓게 잡아 짙은 색이 오래 가고, 아래 3분의 1에서
 * 지평선 쪽으로 빠르게 밝아진다.
 */
const STOPS = [0, 0.57, 1] as const;

/**
 * 하늘.
 */
export function SkyBackdrop({ now }: SkyBackdropProps) {
  const day = isDaytime(now);
  const bands = skyBands(now);

  const left = `${8 + phaseProgress(now) * 84}%` as const;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient
        colors={bands}
        locations={STOPS}
        style={StyleSheet.absoluteFill}
      />

      <View
        style={[
          styles.orb,
          { left, backgroundColor: day ? Ramp.gold[5] : Ramp.neutral[8] },
        ]}
      />
    </View>
  );
}

/** 지금 시간 확인 */
function phaseProgress(now: Date): number {
  const hour = kstHour(now);
  const span = NIGHT_START_HOUR - GAME_DAY_START_HOUR;

  if (isDaytime(now)) return (hour - GAME_DAY_START_HOUR) / span;
  return hour >= NIGHT_START_HOUR
    ? (hour - NIGHT_START_HOUR) / span
    : (hour + GAME_DAY_START_HOUR) / span;
}

const styles = StyleSheet.create({
  orb: {
    position: "absolute",
    top: "14%",
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});
