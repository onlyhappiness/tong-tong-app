import EncryptedStorage from 'react-native-encrypted-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {useShallow} from 'zustand/react/shallow';

interface State {
  userInfo: any;
}

interface Actions {
  setUserInfo: (data: any) => void;
  clearUserInfo: () => void;
}

interface Store extends State, Actions {}

export const useUserStore = create<Store>()(
  persist(
    set => ({
      userInfo: null,
      setUserInfo: ({userInfo}) => set({userInfo}),
      clearUserInfo: () => set({userInfo: null}),
    }),
    {
      name: 'userInfo',
      storage: createJSONStorage(() => EncryptedStorage),
    },
  ),
);

export const useUserInfoState = () =>
  useUserStore(useShallow(({userInfo}) => ({userInfo})));

export const useUserInfoActions = () =>
  useUserStore(
    useShallow(({setUserInfo, clearUserInfo}) => ({
      setUserInfo,
      clearUserInfo,
    })),
  );
