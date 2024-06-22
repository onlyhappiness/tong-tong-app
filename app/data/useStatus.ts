import {create} from 'zustand';

interface State {
  status: any;
}

interface Actions {
  setStatus: (status: any) => void;
  clearStatus: () => void;
}

interface Store extends State, Actions {}

const useStatusStore = create<Store>(set => ({
  status: null,
  setStatus: ({status}) => set({status}),
  clearStatus: () => set({status: null}),
}));

export default useStatusStore;
