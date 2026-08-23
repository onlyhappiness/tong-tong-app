import { type ReactNode, useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

/** 한 번 눌렸다 늘어나는 데 걸리는 시간. 왕복이라 한 호흡은 이 값의 두 배다. */
const IDLE_PERIOD_MS = 1000;

/** 높이 변형. 지평선이라는 수평 기준선에 걸리는 축이라 폭보다 크게 준다. */
const SQUASH_Y = 0.07;

/** 폭 변형. 부피가 유지되는 느낌만 내면 되므로 절반이면 충분하다. */
const SQUASH_X = 0.035;

/** 쓰다듬었을 때 튀어오르는 높이(px) */
const HOP_HEIGHT = 14;

type PetSpriteProps = {
  children: ReactNode;
  bounceKey?: number;
};

/**
 * 펫 그림에 움직임을 입히는 껍데기
 */
export function PetSprite({ children, bounceKey = 0 }: PetSpriteProps) {
  const reduceMotion = useReducedMotion();

  const breath = useSharedValue(0);
  const hop = useSharedValue(0);

  useEffect(() => {
    if (reduceMotion) {
      breath.value = 0;
      return;
    }

    breath.value = withRepeat(
      withTiming(1, {
        duration: IDLE_PERIOD_MS,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true,
    );
  }, [breath, reduceMotion]);

  useEffect(() => {
    // 0은 초기값이라 화면에 처음 뜰 때 혼자 튀지 않게 거른다.
    if (bounceKey === 0 || reduceMotion) return;

    hop.value = withSequence(
      withTiming(-HOP_HEIGHT, {
        duration: 160,
        easing: Easing.out(Easing.quad),
      }),
      withSpring(0, { damping: 9, stiffness: 220 }),
    );
  }, [bounceKey, hop, reduceMotion]);

  const motion = useAnimatedStyle(() => ({
    transform: [
      { translateY: hop.value },
      {
        scaleX: interpolate(breath.value, [0, 1], [1 + SQUASH_X, 1 - SQUASH_X]),
      },
      {
        scaleY: interpolate(breath.value, [0, 1], [1 - SQUASH_Y, 1 + SQUASH_Y]),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.root, motion]}>{children}</Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    // 발이 바닥에 붙어 있어야 한다. 기본값(center)이면 눌릴 때 발이 떠오르고
    // 늘어날 때 잔디를 파고든다 — PetSlot이 지평선에 걸쳐 세우므로 티가 난다.
    transformOrigin: "bottom",
  },
});
