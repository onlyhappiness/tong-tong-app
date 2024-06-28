import {create} from 'zustand';

interface State {
  selectPet: any;
}

interface Actions {
  setSelectPet: (data: any) => void;
}

interface Store extends State, Actions {}

const usePetStore = create<Store>(set => ({
  selectPet: null,
  setSelectPet: ({data}) => set({selectPet: data}),
}));

export default usePetStore;
