import {
  ACTION_CHANGE_INTERVAL,
  CHARACTER_SIZE,
  CLICK_STOP_DURATION,
  FRAME_DURATION,
  MOVE_SPEED,
} from "@/constants/number";
import { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { useBooleanState, useInterval } from "react-simplikit";

export type Action = "idle" | "left" | "right";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function useCharacter() {
  const [action, setAction] = useState<Action>("idle");
  const [frameIndex, setFrameIndex] = useState(1);
  const position = useSharedValue(SCREEN_WIDTH / 2 - CHARACTER_SIZE / 2);
  const clickStopTimeoutRef = useRef<NodeJS.Timeout | any>(null);

  // 메뉴
  const [isMenuOpen, openMenu, closeMenu] = useBooleanState(false);

  // 랜덤 행동 선택 함수
  const selectRandomAction = () => {
    const actions: Action[] = ["idle", "left", "right"];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    setAction(randomAction);
  };

  // 2초마다 행동 변경
  useInterval(() => {
    selectRandomAction();
  }, ACTION_CHANGE_INTERVAL);

  // 이동 애니메이션
  useInterval(
    () => {
      const currentPosition = position.value;
      let newPosition = currentPosition;

      if (action === "left") {
        newPosition = currentPosition - MOVE_SPEED;
        // 왼쪽 경게 도달
        if (newPosition <= 0) {
          newPosition = 0;
          scheduleOnRN(() => setAction("right"));
        }
      } else if (action === "right") {
        newPosition = currentPosition + MOVE_SPEED;
        // 오른쪽 경계 도달
        if (newPosition >= SCREEN_WIDTH - CHARACTER_SIZE) {
          newPosition = SCREEN_WIDTH - CHARACTER_SIZE;
          scheduleOnRN(() => setAction("left"));
        }
      }

      position.value = newPosition;
    },
    {
      delay: 16,
      enabled: action !== "idle",
    }
  );

  // 프레임 애니메이션
  useInterval(
    () => {
      setFrameIndex((prev) => (prev === 1 ? 2 : 1));
    },
    {
      delay: FRAME_DURATION,
      enabled: action !== "idle", // idle이 아닐 때만 실행
    }
  );

  // idle 상태일 때 frameIndex 초기화
  useEffect(() => {
    if (action === "idle") setFrameIndex(1);
  }, [action]);

  // 캐릭터 클릭 핸들러
  const handleCharacterPress = () => {
    console.log("캐릭터 클릭");

    openMenu();

    // 기존 클릭 타이머가 있으면 취소
    if (clickStopTimeoutRef.current) {
      clearTimeout(clickStopTimeoutRef.current as NodeJS.Timeout);
    }

    // 메뉴 열리면 즉시 멈춤
    if (!isMenuOpen) {
      setAction("idle");
    }

    // 2초 후 랜덤 행동으로 변경
    clickStopTimeoutRef.current = setTimeout(() => {
      selectRandomAction();
      closeMenu();
      clickStopTimeoutRef.current = null;
    }, CLICK_STOP_DURATION);
  };

  // 메뉴 액션들
  const handleFeed = () => {
    console.log("밥주기");
    closeMenu();
  };

  const handlePlay = () => {
    console.log("놀아주기");
    closeMenu();
  };

  const handlePet = () => {
    console.log("쓰다듬기");
    closeMenu();
  };

  return {
    action,
    frameIndex,
    position,
    handleCharacterPress,

    // 메뉴 액션들
    isMenuOpen,
    handleFeed,
    handlePlay,
    handlePet,
  };
}
