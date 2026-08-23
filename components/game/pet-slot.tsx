import { Ramp, Spacing } from "@/constants/theme";
import { type ReactNode } from "react";
import { StyleSheet, View } from "react-native";

/**
 * 펫 윗변이 지평선보다 얼마나 아래인가.
 *
 * 음수면 펫이 지평선 위로 올라와 하늘에 걸친다. 40만큼 올렸더니 펫과 액션이
 * 위로 몰려 잔디 아래쪽이 비었다 — 지금은 살짝 내려 잔디 한가운데에 세운다.
 */
const PET_TOP = 10;

/**
 * 말상자가 쓰는 세로 공간.
 *
 * 높이를 고정하고 아래로 정렬하는 이유: 대사가 한 줄이든 두 줄이든 **말상자의
 * 아랫변이 같은 자리**에 있어야 펫이 위아래로 흔들리지 않는다. 두 줄짜리
 * 대사는 이 칸을 넘어 하늘 쪽으로 자란다.
 */
const BUBBLE_ZONE = 72;

type PetSlotProps = {
  children: ReactNode;
  /** 펫 위에 뜨는 것. 말상자가 여기 온다. */
  header?: ReactNode;
  /** 그림자 아래에 붙는 것. 액션 버튼이 여기 온다. */
  footer?: ReactNode;
};

/**
 * 지평선에 걸쳐 펫을 세우는 자리.
 *
 * 말상자·펫·액션을 한 덩어리로 쌓는다. 셋의 간격이 `gap` 하나로 정해지므로
 * 하나를 옮겨도 나머지가 따라온다 — 예전처럼 하늘의 `paddingBottom`과 이 곳의
 * `top`이 우연히 만들어내던 거리가 아니다.
 */
export function PetSlot({ children, header, footer }: PetSlotProps) {
  return (
    <View style={styles.root}>
      <View pointerEvents="box-none" style={styles.header}>
        {header}
      </View>

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
    // 말상자 칸은 지평선 위(하늘)에 놓이고, 펫은 PET_TOP만큼 잔디에서 시작한다.
    top: PET_TOP - BUBBLE_ZONE,
    alignItems: "center",
    gap: Spacing.three,
  },
  header: {
    alignSelf: "stretch",
    height: BUBBLE_ZONE,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  figure: {
    alignItems: "center",
  },
  shadow: {
    width: 100,
    height: 14,
    borderRadius: 7,
    marginTop: -6,
    backgroundColor: Ramp.grass[1],
    opacity: 0.45,
  },
});
