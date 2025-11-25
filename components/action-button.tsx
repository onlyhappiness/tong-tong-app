import { useGameContext } from "@/providers/game-provider";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// 임시 데이터 (나중에 tanstack으로 교체)
const MAX_FEED_COUNT = 5;
const MAX_PLAY_COUNT = 5;

// 하루 리셋을 위한 날짜 체크 (간단한 구현)
const getTodayKey = () => {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
};

export default function ActionButtons() {
  const { handleFeed, handlePlay, handlePet } = useGameContext();

  const [feedCount, setFeedCount] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const [lastResetDate, setLastResetDate] = useState(getTodayKey());

  // 날짜 변경 체크 및 리셋
  useEffect(() => {
    const todayKey = getTodayKey();
    if (lastResetDate !== todayKey) {
      setFeedCount(0);
      setPlayCount(0);
      setLastResetDate(todayKey);
    }
  }, [lastResetDate]);

  const handleFeedPress = () => {
    if (feedCount < MAX_FEED_COUNT) {
      setFeedCount((prev) => prev + 1);
      handleFeed();
    }
  };

  const handlePlayPress = () => {
    if (playCount < MAX_PLAY_COUNT) {
      setPlayCount((prev) => prev + 1);
      handlePlay();
    }
  };

  const handlePetPress = () => {
    handlePet();
  };

  const isFeedDisabled = feedCount >= MAX_FEED_COUNT;
  const isPlayDisabled = playCount >= MAX_PLAY_COUNT;

  return (
    <View style={styles.container}>
      {/* 오늘 사용량 표시 */}
      <View style={styles.usageContainer}>
        <Text style={styles.usageLabel}>오늘 사용량: </Text>
        <Text style={styles.usageText}>
          🍙 {feedCount}/{MAX_FEED_COUNT} · 🎈 {playCount}/{MAX_PLAY_COUNT}
        </Text>
      </View>

      {/* 액션 버튼들 */}
      <View style={styles.buttonsContainer}>
        {/* 밥주기 */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.feedButton,
            isFeedDisabled && styles.buttonDisabled,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleFeedPress}
          disabled={isFeedDisabled}
        >
          <Text style={styles.buttonEmoji}>🍙</Text>
          <Text
            style={[styles.buttonLabel, isFeedDisabled && styles.labelDisabled]}
          >
            밥 주기
          </Text>
        </Pressable>

        {/* 놀아주기 */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.playButton,
            isPlayDisabled && styles.buttonDisabled,
            pressed && styles.buttonPressed,
          ]}
          onPress={handlePlayPress}
          disabled={isPlayDisabled}
        >
          <Text style={styles.buttonEmoji}>🎈</Text>
          <Text
            style={[styles.buttonLabel, isPlayDisabled && styles.labelDisabled]}
          >
            놀아주기
          </Text>
        </Pressable>

        {/* 쓰다듬기 */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.petButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handlePetPress}
        >
          <Text style={styles.buttonEmoji}>🤚</Text>
          <Text style={styles.buttonLabel}>쓰다듬기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF9F5",
    borderTopWidth: 0,
    shadowColor: "#FFB6C1",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  usageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6, // 10 -> 6
    paddingHorizontal: 12, // 16 -> 12
    backgroundColor: "#FFF5E6",
    marginHorizontal: 12,
    marginTop: 4, // 8 -> 6
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#FFE4B5",
  },
  usageLabel: {
    fontSize: 13,
    color: "#8B6F47",
    fontWeight: "600",
  },
  usageText: {
    fontSize: 13,
    color: "#6B4423",
    fontWeight: "700",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 6, // 16 -> 10
    paddingHorizontal: 16, // 20 -> 16
    // paddingBottom: 12, // 20 -> 12
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4, // 16 -> 12
    minWidth: 85,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  feedButton: {
    backgroundColor: "#FFE4E1",
    borderWidth: 1,
    borderColor: "#FFB6C1",
  },
  playButton: {
    backgroundColor: "#E0F2F1",
    borderWidth: 1,
    borderColor: "#80CBC4",
  },
  petButton: {
    backgroundColor: "#FFF0F5",
    borderWidth: 1,
    borderColor: "#FFB6C1",
  },
  buttonDisabled: {
    backgroundColor: "#F5F5F5",
    borderColor: "#E0E0E0",
    opacity: 0.5,
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
  buttonEmoji: {
    fontSize: 28,
    marginBottom: 4, // 6 -> 4
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#5D4037",
    letterSpacing: 0.5,
  },
  labelDisabled: {
    color: "#BDBDBD",
  },
});
