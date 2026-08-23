import { Pet } from "@/api/type";
import { Ramp } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

type PetPlaceholderProps = {
  pet: Pet;
};

/**
 * 펫 아트가 들어오기 전까지 자리를 잡아두는 임시 상자.
 *
 */
export function PetPlaceholder({ pet }: PetPlaceholderProps) {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{pet.stage}</Text>
      <Text style={styles.text}>{pet.species ?? "—"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 128,
    height: 128,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderCurve: "continuous",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: Ramp.neutral[7],
  },
  text: {
    color: Ramp.neutral[8],
    fontSize: 11,
    fontWeight: "700",
  },
});
