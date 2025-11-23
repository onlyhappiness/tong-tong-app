import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { CHARACTER_SIZE } from "@/constants/number";
import { useGameContext } from "@/providers/game-provider";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";

/**
 * @description
 * 캐릭터 메뉴 컴포넌트
 *
 * 캐릭터를 눌렀을 때 나오는 메뉴 컴포넌트
 */
export default function CharacterMenu() {
  // const { isMenuOpen, handleFeed, handlePlay, handlePet } = useCharacter();
  const { isMenuOpen, handleFeed, handlePlay, handlePet } = useGameContext();

  // 메뉴 애니메이션
  const menuOpacity = useSharedValue(0);
  const menuTranslateY = useSharedValue(-20);

  // 메뉴 애니메이션 스타일
  const menuAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: menuOpacity.value,
      transform: [{ translateY: menuTranslateY.value }],
    };
  });

  useEffect(() => {
    if (isMenuOpen) {
      menuOpacity.value = withTiming(1, { duration: 200 });
      menuTranslateY.value = withTiming(0, { duration: 200 });
    } else {
      menuOpacity.value = withTiming(0, { duration: 200 });
      menuTranslateY.value = withTiming(-20, { duration: 200 });
    }
  }, [isMenuOpen]);

  return (
    <>
      {isMenuOpen && (
        <Animated.View style={[styles.menuContainer, menuAnimatedStyle]}>
          <Pressable style={styles.menuItem} onPress={handleFeed}>
            <Ionicons name="restaurant" size={60} color="#4CAF50" />
            <Text style={styles.menuLabel}>밥주기</Text>
          </Pressable>
          <Pressable style={styles.menuItem} onPress={handlePlay}>
            <Ionicons name="football" size={60} color="#2196F3" />
            <Text style={styles.menuLabel}>놀아주기</Text>
          </Pressable>
          <Pressable style={styles.menuItem} onPress={handlePet}>
            <Ionicons name="heart" size={60} color="#F44336" />
            <Text style={styles.menuLabel}>쓰다듬기</Text>
          </Pressable>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    bottom: CHARACTER_SIZE + 20,
    left: CHARACTER_SIZE / 2 - 90, // 중앙 정렬
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 16,
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    minWidth: 60,
  },
  menuLabel: {
    marginTop: 4,
    fontSize: 12,
    color: "#333",
  },
});
