import { Ramp, Spacing } from "@/constants/theme";
import { type ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type PetSlotProps = {
  children: ReactNode;
  /** 그림자 아래에 붙는 것. 액션 버튼이 여기 온다. */
  footer?: ReactNode;
};

/**
 * 지평선에 걸쳐 펫을 세우는 자리.
 */
export function PetSlot({ children, footer }: PetSlotProps) {
  return (
    <View style={styles.root}>
      <View pointerEvents="none" style={styles.figure}>
        {children}
        <View style={styles.shadow} />
      </View>

      {footer}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    // 지평선보다 이만큼 위에서 시작한다.
    // 더 내리려면 0에 가깝게, 올리려면 더 음수로.
    top: -28,
    alignItems: "center",
    gap: Spacing.three,
  },
  figure: {
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
