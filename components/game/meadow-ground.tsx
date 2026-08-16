import { StyleSheet, View } from "react-native";

import { Ramp } from "@/constants/theme";

/**
 * 들판에 흩뿌리는 점 텍스처.
 *
 * 위치를 고정값으로 둔다 — 난수를 쓰면 렌더할 때마다 자리를 옮긴다.
 * 지평선 위에 세우지 않고 각 띠 **안쪽**에 넣는다. 가장자리에 세우면 풀이
 * 아니라 물방울처럼 보인다.
 */
const SPECKS = {
  far: [
    { left: "8%", top: 10 },
    { left: "31%", top: 16 },
    { left: "57%", top: 9 },
    { left: "79%", top: 17 },
  ],
  mid: [
    { left: "5%", top: 14 },
    { left: "22%", top: 34 },
    { left: "44%", top: 20 },
    { left: "66%", top: 40 },
    { left: "88%", top: 24 },
  ],
  near: [
    { left: "13%", top: 16 },
    { left: "38%", top: 30 },
    { left: "61%", top: 12 },
    { left: "85%", top: 28 },
  ],
} as const;

/**
 * 잔디 지면. T6에서 도트 그림으로 바뀐다.
 *
 * 세 겹으로 나누되 **위가 밝고 아래로 갈수록 어둡다** — 빛이 위에서 온다는
 * 것만 지켜도 평면이 입체로 읽힌다. 각 띠에 자기보다 한 단계 어두운 점을
 * 뿌려 단색 면이 아니게 만든다.
 */
export function MeadowGround() {
  return (
    <View style={styles.root}>
      <Band style={styles.far} specks={SPECKS.far} speckColor={Ramp.grass[3]} />
      <Band style={styles.mid} specks={SPECKS.mid} speckColor={Ramp.grass[2]} />
      <Band
        style={styles.near}
        specks={SPECKS.near}
        speckColor={Ramp.grass[1]}
      />
    </View>
  );
}

type BandProps = {
  style: object;
  /** `left`는 퍼센트 문자열이다. RN 타입이 `${number}%`만 받는다. */
  specks: readonly { left: `${number}%`; top: number }[];
  speckColor: string;
};

function Band({ style, specks, speckColor }: BandProps) {
  return (
    <View style={style}>
      {specks.map((speck) => (
        <View
          key={speck.left}
          style={[
            styles.speck,
            { left: speck.left, top: speck.top, backgroundColor: speckColor },
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
  // 고정 높이가 아니라 비율이다. 잔디 영역 자체가 화면 크기에 따라 달라지므로,
  // 높이를 못 박으면 작은 기기에서 mid가 사라지고 큰 기기에서 mid만 남는다.
  far: {
    flex: 2,
    backgroundColor: Ramp.grass[4],
  },
  mid: {
    flex: 3,
    backgroundColor: Ramp.grass[3],
  },
  near: {
    flex: 3,
    backgroundColor: Ramp.grass[2],
  },
  speck: {
    position: "absolute",
    width: 6,
    height: 3,
    borderRadius: 1,
  },
});
