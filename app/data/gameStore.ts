import {GameEngine} from 'react-native-game-engine';
import {create} from 'zustand';
import {useShallow} from 'zustand/react/shallow';

interface State {
  gameEngineRef: GameEngine | null;
}

interface Actions {
  setGameEngineRef: (data: GameEngine | null) => void;
}

interface Store extends State, Actions {}

const useGameStore = create<Store>(set => ({
  gameEngineRef: null,
  setGameEngineRef: (data: GameEngine | null) => set({gameEngineRef: data}),
}));

export const useGameState = () =>
  useGameStore(useShallow(({gameEngineRef}) => ({gameEngineRef})));

export const useGameActions = () =>
  useGameStore(
    useShallow(({setGameEngineRef}) => ({
      setGameEngineRef,
    })),
  );
