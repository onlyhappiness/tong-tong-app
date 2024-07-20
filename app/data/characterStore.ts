import {create} from 'zustand';
import {useShallow} from 'zustand/react/shallow';

interface State {
  character: any;
}

interface Actions {
  setCharacter: (data: string) => void;
}

interface Store extends State, Actions {}

const useCharacterStore = create<Store>(set => ({
  character: 'chick',
  setCharacter: (data: string) => set({character: data}),
}));

export const useCharacterState = () =>
  useCharacterStore(useShallow(({character}) => ({character})));

export const useCharacterActions = () =>
  useCharacterStore(
    useShallow(({setCharacter}) => ({
      setCharacter,
    })),
  );