import { Image, Pressable, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import CharacterMenu from "@/components/character-menu";
import CharacterStatusBar from "@/components/character-status-bar";
import { CHARACTER_SIZE } from "@/constants/number";
import { useGameContext } from "@/providers/game-provider";

export default function GameScreen() {
  // const { action, frameIndex, position, handleCharacterPress } = useCharacter();
  const { action, frameIndex, position, handleCharacterPress } =
    useGameContext();

  // 이미지 경로 결정
  const getImageSource = (action: string, frameIndex: number) => {
    if (action === "idle") {
      return require("../../assets/character/poodle/idle-1.png");
    }
    if (action === "left") {
      // 모든 이미지를 미리 로드하고 조건부로 선택
      const leftImages = {
        1: require("../../assets/character/poodle/left-1.png"),
        2: require("../../assets/character/poodle/left-2.png"),
      };
      return leftImages[frameIndex as 1 | 2];
    }
    if (action === "right") {
      const rightImages = {
        1: require("../../assets/character/poodle/right-1.png"),
        2: require("../../assets/character/poodle/right-2.png"),
      };
      return rightImages[frameIndex as 1 | 2];
    }

    return require("../../assets/character/poodle/idle-1.png");
  };

  // 애니메이션 스타일
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: position.value }],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gameArea}>
        <Animated.View style={[styles.characterContainer, animatedStyle]}>
          {/* 아이콘 메뉴 */}
          <CharacterMenu />

          <Pressable onPress={handleCharacterPress}>
            <Image
              source={getImageSource(action, frameIndex)}
              style={styles.character}
            />
          </Pressable>
        </Animated.View>
      </View>

      <CharacterStatusBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gameArea: {
    flex: 1,
    position: "relative",
  },
  characterContainer: {
    position: "absolute",
    bottom: 60, // 화면 하단에서의 위치 (조정 가능)
  },
  character: {
    width: CHARACTER_SIZE,
    height: CHARACTER_SIZE,
    resizeMode: "contain",
  },
});
