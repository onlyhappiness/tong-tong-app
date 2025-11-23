import useCharacter, { Action } from "@/hooks/use-character";
import { SharedValue } from "react-native-reanimated";
import { buildContext } from "react-simplikit";

type GameContextType = {
  action: Action;
  frameIndex: number;
  position: SharedValue<number>;
  handleCharacterPress: () => void;
  isMenuOpen: boolean;
  handleFeed: () => void;
  handlePlay: () => void;
  handlePet: () => void;
};
export const [Provider, useGameContext] = buildContext<GameContextType>(
  "game-context",
  undefined
);

export default function GameProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    action,
    frameIndex,
    position,
    handleCharacterPress,

    isMenuOpen,
    handleFeed,
    handlePlay,
    handlePet,
  } = useCharacter();

  return (
    <Provider
      action={action}
      frameIndex={frameIndex}
      position={position}
      handleCharacterPress={handleCharacterPress}
      isMenuOpen={isMenuOpen}
      handleFeed={handleFeed}
      handlePlay={handlePlay}
      handlePet={handlePet}
    >
      {children}
    </Provider>
  );
}
