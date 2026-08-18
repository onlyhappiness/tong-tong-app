import { GaugeRow } from "@/components/game/gauge-row";
import { Ramp } from "@/constants/theme";
import { StyleSheet, View } from "react-native";

const CELLS = 10;
const PER_CELL = 100 / CELLS;

type HeartRowProps = {
  /** 친밀도 0~100. */
  value: number;
};

/**
 * 친밀도. 10칸이고 한 칸이 10이다.
 *
 */
export function HeartRow({ value }: HeartRowProps) {
  return (
    <GaugeRow label="친밀도" value={value}>
      {Array.from({ length: CELLS }, (_, index) => {
        const filled = value >= (index + 1) * PER_CELL;
        const half = !filled && value >= index * PER_CELL + PER_CELL / 2;

        return (
          <View
            key={index}
            style={[
              styles.cell,
              filled && styles.cellFilled,
              half && styles.cellHalf,
            ]}
          />
        );
      })}
    </GaugeRow>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Ramp.berry[3],
    backgroundColor: "transparent",
  },
  cellFilled: {
    backgroundColor: Ramp.berry[3],
  },
  cellHalf: {
    backgroundColor: Ramp.berry[5],
  },
});
