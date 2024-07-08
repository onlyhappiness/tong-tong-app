import {getAuthLogin} from '@/services/apis/auth';
import {userData} from '@/types/user';
import {removeStorage} from '@/utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {useShallow} from 'zustand/react/shallow';

export const fetchUserInfo = async () => {
  try {
    const userInfo = await getAuthLogin();
    return userInfo;
  } catch (error) {
    console.error('Error fetching user info:', error);
    await removeStorage('token');
    return null;
  }
};

type userStore = {
  userInfo: userData | null;
  setUserInfo: (data: userData | unknown) => void;
  clearUserInfo: () => void;
};

const userStore = create(
  persist<userStore>(
    set => ({
      userInfo: null,
      setUserInfo: async (userInfo: any) => {
        // const userInfo = await fetchUserInfo();
        set({userInfo});
      },
      clearUserInfo: async () => {
        await removeStorage('token');
        set({userInfo: null});
      },
    }),
    {
      // 참고: https://stackoverflow.com/questions/72311639/unable-to-use-zustand-persist-middleware
      name: 'userInfo',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useUserInfoState = () =>
  userStore(useShallow(({userInfo}) => ({userInfo})));

export const useUserInfoActions = () =>
  userStore(
    useShallow(({setUserInfo, clearUserInfo}) => ({
      setUserInfo,
      clearUserInfo,
    })),
  );
