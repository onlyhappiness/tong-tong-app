import { Colors, Ramp, Spacing } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

const LEVELS = 5;

type FoodBowlProps = {
  hunger: number;
};

/**
 * 배고픔
 */
export function FoodBowl({ hunger }: FoodBowlProps) {
  const level = Math.ceil((hunger / 100) * LEVELS);

  return (
    <View style={styles.root}>
      <View style={styles.levels}>
        {Array.from({ length: LEVELS }, (_, index) => (
          <View
            key={index}
            style={[styles.block, index < level && styles.blockFilled]}
          />
        ))}
      </View>

      <Text style={styles.value} selectable>
        {hunger}
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
  levels: {
    flexDirection: "row",
    gap: Spacing.half,
  },
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
  value: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontVariant: ["tabular-nums"],
    minWidth: 24,
    textAlign: "right",
  },
});
