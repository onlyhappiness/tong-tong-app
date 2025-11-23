import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// 임시 데이터 (나중에 tanstack으로 교체)
const TEMP_HUNGER = 75;
const TEMP_HAPPINESS = 60;
const TEMP_EXPERIENCE = 45;

type StatusBarItemProps = {
  label: string;
  value: number;
  color: string;
};

function StatusBarItem({ label, value, color }: StatusBarItemProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(value, { duration: 300 });
  }, [value]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    };
  });

  return (
    <View style={styles.statusItem}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{Math.round(value)}</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            { backgroundColor: color },
            animatedStyle,
          ]}
        />
      </View>
    </View>
  );
}

export default function CharacterStatusBar() {
  return (
    <View style={styles.container}>
      <StatusBarItem label="배고픔" value={TEMP_HUNGER} color="#F44336" />
      <StatusBarItem label="행복" value={TEMP_HAPPINESS} color="#2196F3" />
      <StatusBarItem label="경험치" value={TEMP_EXPERIENCE} color="#4CAF50" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  statusItem: {
    marginBottom: 12,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  value: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
});
