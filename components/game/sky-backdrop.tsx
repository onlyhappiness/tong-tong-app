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
 * 지평선이 밝아야 잔디와 맞닿는 선이 산다.
 *
 * 화면 맨 위 배경색으로도 쓰이므로(첫 칸) 밖으로 내보낸다.
 */
export function skyBands(now: Date): readonly [string, string, string] {
  return isDaytime(now)
    ? [Ramp.sky[3], Ramp.sky[4], Ramp.sky[5]]
    : [Ramp.sky[0], Ramp.sky[1], Ramp.sky[2]];
}

/**
 * 색이 바뀌는 지점. 위쪽을 넓게 잡아 짙은 색이 오래 가고, 아래 3분의 1에서
 * 지평선 쪽으로 빠르게 밝아진다. 예전 색 띠의 4:2:1 비율을 이어받은 값이다.
 */
const STOPS = [0, 0.57, 1] as const;

/**
 * 하늘.
 *
 * 색 띠 세 겹이었던 것을 그라데이션으로 바꿨다. 띠는 도트 그래픽의 결에
 * 맞지만, 화면 절반을 차지하다 보니 경계가 UI 줄무늬처럼 읽혔다. 하늘은
 * 스프라이트가 아니라 코드가 칠하는 면이라 부드러워도 픽셀 아트와 어긋나지
 * 않는다 — 잔디는 원근을 나누는 장치라 띠로 남긴다.
 */
export function SkyBackdrop({ now }: SkyBackdropProps) {
  const day = isDaytime(now);
  const bands = skyBands(now);

  // 해·달은 왼쪽에서 떠 오른쪽으로 진다. 왼쪽 끝이 KST 06:00이고,
  // 부화·진화·출석 초기화가 전부 그때 일어난다.
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
