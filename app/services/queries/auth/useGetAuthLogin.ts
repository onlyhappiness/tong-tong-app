import {useUserInfoActions} from '@/data/userStore';
import {getStorage} from '@/utils/storage';
import {useEffect} from 'react';

const useGetAuthLogin = () => {
  const {setUserInfo, clearUserInfo} = useUserInfoActions();

  useEffect(() => {
    const loadPrincipal = async () => {
      const token = await getStorage('token');

      if (token) {
        setUserInfo();
      }
    };

    loadPrincipal();
  }, [clearUserInfo, setUserInfo]);
};

export default useGetAuthLogin;
