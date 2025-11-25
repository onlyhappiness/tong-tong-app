import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// 임시 데이터 (나중에 tanstack으로 교체)
const TEMP_LEVEL = 1;
const TEMP_EXPERIENCE = 45; // character-status-bar.tsx에서 가져옴

const AVATAR_SIZE = 40;
const PROGRESS_RING_SIZE = 44; // avatar보다 약간 큰 크기
const PROGRESS_RING_STROKE_WIDTH = 3;
const PROGRESS_RING_RADIUS =
  (PROGRESS_RING_SIZE - PROGRESS_RING_STROKE_WIDTH) / 2;
const PROGRESS_RING_CIRCUMFERENCE = 2 * Math.PI * PROGRESS_RING_RADIUS;

export default function CharacterHeader() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(TEMP_EXPERIENCE, { duration: 300 });
  }, []);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset =
      PROGRESS_RING_CIRCUMFERENCE -
      (progress.value / 100) * PROGRESS_RING_CIRCUMFERENCE;
    return {
      strokeDashoffset,
    };
  });

  return (
    <View style={styles.container}>
      {/* 원형 경험치 바와 Avatar */}
      <View style={styles.avatarContainer}>
        <Svg
          width={PROGRESS_RING_SIZE}
          height={PROGRESS_RING_SIZE}
          style={styles.progressRing}
        >
          {/* 배경 원 */}
          <Circle
            cx={PROGRESS_RING_SIZE / 2}
            cy={PROGRESS_RING_SIZE / 2}
            r={PROGRESS_RING_RADIUS}
            stroke="#e0e0e0"
            strokeWidth={PROGRESS_RING_STROKE_WIDTH}
            fill="none"
          />
          {/* 경험치 프로그레스 원 */}
          <AnimatedCircle
            cx={PROGRESS_RING_SIZE / 2}
            cy={PROGRESS_RING_SIZE / 2}
            r={PROGRESS_RING_RADIUS}
            stroke="#4CAF50"
            strokeWidth={PROGRESS_RING_STROKE_WIDTH}
            fill="none"
            strokeDasharray={PROGRESS_RING_CIRCUMFERENCE}
            strokeLinecap="round"
            transform={`rotate(-90 ${PROGRESS_RING_SIZE / 2} ${
              PROGRESS_RING_SIZE / 2
            })`}
            animatedProps={animatedProps}
          />
        </Svg>
        <View style={styles.avatarWrapper}>
          <Image
            source={require("@/assets/character/poodle/idle-1.png")}
            style={styles.avatar}
          />
        </View>
      </View>

      <View style={styles.levelContainer}>
        <Text style={styles.levelText}>Lv. {TEMP_LEVEL}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  avatarContainer: {
    position: "relative",
    width: PROGRESS_RING_SIZE,
    height: PROGRESS_RING_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  progressRing: {
    position: "absolute",
  },
  avatarWrapper: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    resizeMode: "cover",
  },
  levelContainer: {
    marginLeft: 12,
  },
  levelText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
});
