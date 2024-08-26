import {useUserInfoActions} from '@/data/userStore';
import {getAuthLogin} from '@/services/apis/auth';
import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {queryKeys} from '../queryKey';

const useGetAuthLogin = () => {
  const {setUserInfo, clearUserInfo} = useUserInfoActions();

  const {
    data: userInfo,
    isLoading,
    isSuccess: isLoginSuccess,
    isError: isLoginError,
  } = useQuery({
    queryKey: queryKeys.AUTH_LOGIN,
    queryFn: () => getAuthLogin(),
    refetchOnReconnect: true,
    refetchIntervalInBackground: true, // 백그라운드에서도 실행하도록
    // retry: true,
  });

  useEffect(() => {
    if (isLoginSuccess) {
      setUserInfo(userInfo);
    } else if (isLoginError) {
      clearUserInfo();
    }
  }, [clearUserInfo, isLoginError, isLoginSuccess, setUserInfo, userInfo]);

  return {
    data: userInfo,
    isLoading,
  };
};

export default useGetAuthLogin;
