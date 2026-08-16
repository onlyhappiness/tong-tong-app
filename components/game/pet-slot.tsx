import { Ramp } from "@/constants/theme";
import { StyleSheet, View } from "react-native";

type PetSlotProps = {
  children: React.ReactNode;
};

/**
 * 지평선에 걸쳐 펫을 세우는 자리.
 */
export function PetSlot({ children }: PetSlotProps) {
  return (
    <View style={styles.root} pointerEvents="none">
      {children}
      <View style={styles.shadow} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -28,
    alignItems: "center",
  },
  shadow: {
    width: 76,
    height: 12,
    borderRadius: 6,
    marginTop: -6,
    backgroundColor: Ramp.grass[1],
    opacity: 0.45,
  },
});
