import { GaugeRow } from "@/components/game/gauge-row";
import { Ramp } from "@/constants/theme";
import { StyleSheet, View } from "react-native";

const LEVELS = 5;

type FoodBowlProps = {
  /** 배고픔 0~100. 100이 배부른 상태다. */
  hunger: number;
};

/**
 * 배고픔. 5단계다.
 *
 * 지금은 네모 다섯 칸이지만 T6에서 밥그릇 도트 5장으로 바뀐다. 단계 수를
 * 지금 5로 고정해두는 이유가 그것이다 — 그림이 와도 계산이 그대로다.
 */
export function FoodBowl({ hunger }: FoodBowlProps) {
  const level = Math.ceil((hunger / 100) * LEVELS);

  return (
    <GaugeRow label="배고픔" value={hunger}>
      {Array.from({ length: LEVELS }, (_, index) => (
        <View
          key={index}
          style={[styles.block, index < level && styles.blockFilled]}
        />
      ))}
    </GaugeRow>
  );
}

const styles = StyleSheet.create({
  block: {
    width: 14,
    height: 12,
    borderRadius: 3,
    borderCurve: "continuous",
    borderWidth: 2,
    borderColor: Ramp.soil[2],
    backgroundColor: "transparent",
  },
  blockFilled: {
    backgroundColor: Ramp.soil[2],
  },
});
