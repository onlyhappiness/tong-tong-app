import { Colors, Ramp, Spacing } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

const CELLS = 10;
const PER_CELL = 100 / CELLS;

type HeartRowProps = {
  value: number;
};

/**
 * 친밀도
 */
export function HeartRow({ value }: HeartRowProps) {
  return (
    <View style={styles.root}>
      <View style={styles.cells}>
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
      </View>

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
    justifyContent: "space-between",
    gap: Spacing.two,
  },
  cells: {
    flexDirection: "row",
    gap: Spacing.half,
  },
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
  value: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontVariant: ["tabular-nums"],
    minWidth: 24,
    textAlign: "right",
  },
});
