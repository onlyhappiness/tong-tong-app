import { GaugeRow } from "@/components/game/gauge-row";
import { Ramp } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HEARTS = 5;
const PER_HEART = 100 / HEARTS;

type HeartRowProps = {
  /** 친밀도 0~100. */
  value: number;
};

/**
 * 친밀도. 하트 다섯 개이고 한 개가 20이다.
 *
 * 빈 동그라미 열 개에서 하트 다섯 개로 줄였다. 도형 수가 줄어 카드가 좁아지고,
 * 무엇을 재는 게이지인지 그림이 바로 말해준다. 반 칸은 `heart-half-full`이
 * 그린다 — 색만 다른 반 칸은 "덜 찬 것"으로 안 읽힌다.
 */
export function HeartRow({ value }: HeartRowProps) {
  return (
    <GaugeRow icon="heart" iconColor={Ramp.berry[3]} value={value}>
      {Array.from({ length: HEARTS }, (_, index) => {
        const filled = value >= (index + 1) * PER_HEART;
        const half = !filled && value >= index * PER_HEART + PER_HEART / 2;

        return (
          <MaterialCommunityIcons
            key={index}
            name={filled ? "heart" : half ? "heart-half-full" : "heart-outline"}
            size={16}
            color={Ramp.berry[3]}
          />
        );
      })}
    </GaugeRow>
  );
}
