import {GameEngine} from 'react-native-game-engine';
import {create} from 'zustand';
import {useShallow} from 'zustand/react/shallow';

interface State {
  gameEngineRef: GameEngine | null;
  character: any;
}

interface Actions {
  setCharacter: (data: string) => void;
  setGameEngineRef: (data: GameEngine | null) => void;
}

interface Store extends State, Actions {}

const useGameStore = create<Store>(set => ({
  character: null,
  setCharacter: (data: string) => set({character: data}),

  gameEngineRef: null,
  setGameEngineRef: (data: GameEngine | null) => set({gameEngineRef: data}),
}));

export const useGameState = () =>
  useGameStore(
    useShallow(({character, gameEngineRef}) => ({character, gameEngineRef})),
  );

export const useGameActions = () =>
  useGameStore(
    useShallow(({setCharacter, setGameEngineRef}) => ({
      setCharacter,
      setGameEngineRef,
    })),
  );
