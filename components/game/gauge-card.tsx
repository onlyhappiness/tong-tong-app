import { Pet } from "@/api/type";
import { FoodBowl } from "@/components/game/food-bowl";
import { HeartRow } from "@/components/game/heart-row";
import { Colors, Spacing } from "@/constants/theme";
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
    // 내용만큼만 차지한다. 화면 폭을 채우면 카드가 아니라 띠가 된다.
    alignSelf: "flex-start",
    marginLeft: Spacing.three,
    marginTop: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    gap: Spacing.one,
    borderRadius: 16,
    borderCurve: "continuous",
    backgroundColor: Colors.panel,
    boxShadow: `0 4px 12px ${Colors.tintShadow}`,
  },
});
