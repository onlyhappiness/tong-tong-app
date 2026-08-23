import { Pet } from "@/api/type";
import { FoodBowl } from "@/components/game/food-bowl";
import { HeartRow } from "@/components/game/heart-row";
import { Card, Colors, Spacing } from "@/constants/theme";
import { StyleSheet, View } from "react-native";

type GaugeCardProps = {
  pet: Pet;
};

/**
 * 배고픔·친밀도를 보여주는 좌측 상단 카드.
 */
export function GaugeCard({ pet }: GaugeCardProps) {
  return (
    <View style={styles.root}>
      <FoodBowl hunger={pet.hunger} />
      <HeartRow value={pet.intimacy} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    gap: Spacing.one,
    borderRadius: Card.radius,
    borderCurve: "continuous",
    borderWidth: Card.borderWidth,
    borderColor: Card.borderColor,
    backgroundColor: Colors.panel,
    boxShadow: Card.shadow,
  },
});
