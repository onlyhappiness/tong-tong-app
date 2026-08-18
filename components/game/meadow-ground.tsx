import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

import { Ramp } from "@/constants/theme";

/** 위(먼 잔디, 빛을 받음) → 아래(가까운 잔디, 그늘). */
const GRASS = [Ramp.grass[4], Ramp.grass[3], Ramp.grass[2]] as const;

/**
 * 색이 바뀌는 지점.
 */
const STOPS = [0, 0.35, 1] as const;

type Speck = {
  left: `${number}%`;
  top: `${number}%`;
  size: "far" | "mid" | "near";
};

/**
 * 들판에 흩뿌리는 점 텍스처.
 */
const SPECKS: readonly Speck[] = [
  { left: "8%", top: "9%", size: "far" },
  { left: "31%", top: "14%", size: "far" },
  { left: "57%", top: "8%", size: "far" },
  { left: "79%", top: "15%", size: "far" },
  { left: "5%", top: "34%", size: "mid" },
  { left: "22%", top: "48%", size: "mid" },
  { left: "44%", top: "38%", size: "mid" },
  { left: "66%", top: "52%", size: "mid" },
  { left: "88%", top: "41%", size: "mid" },
  { left: "13%", top: "72%", size: "near" },
  { left: "38%", top: "84%", size: "near" },
  { left: "61%", top: "69%", size: "near" },
  { left: "85%", top: "80%", size: "near" },
];

/**
 * 잔디 지면.
 */
export function MeadowGround() {
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={GRASS}
        locations={STOPS}
        style={StyleSheet.absoluteFill}
      />

      {SPECKS.map((speck) => (
        <View
          key={`${speck.left}-${speck.top}`}
          style={[
            styles.speck,
            styles[speck.size],
            { left: speck.left, top: speck.top },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  speck: {
    position: "absolute",
    borderRadius: 1,
  },
  far: {
    width: 5,
    height: 2,
    backgroundColor: Ramp.grass[3],
  },
  mid: {
    width: 7,
    height: 3,
    backgroundColor: Ramp.grass[2],
  },
  near: {
    width: 10,
    height: 4,
    backgroundColor: Ramp.grass[1],
  },
});
