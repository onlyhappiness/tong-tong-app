import {useUserInfoActions} from '@/data/userStore';
import {getAuthLogin} from '@/services/apis/auth';
import {getEncryptStorage, removeEncryptStorage} from '@/utils/storage';
import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {queryKeys} from './queryKey';

const useGetAuthLogin = async () => {
  const accessToken = await getEncryptStorage('access_token');

  console.log('accessToken::', accessToken);

  const {setUserInfo, clearUserInfo} = useUserInfoActions();

  const {
    data: userInfo,
    isSuccess: isLoginSuccess,
    isError: isLoginError,
  } = useQuery({
    queryKey: [queryKeys.auth, queryKeys.login],
    queryFn: () => getAuthLogin(),
    enabled: !!accessToken,
    // refetchInterval: ,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
    retry: true,
  });

  // 로그인 유저 정보
  useEffect(() => {
    if (isLoginSuccess) {
      setUserInfo({userInfo});
    } else if (isLoginError) {
      clearUserInfo();
      removeEncryptStorage('access_token');
    }
  }, [
    clearUserInfo,
    isLoginError,
    isLoginSuccess,
    setUserInfo,
    userInfo,
    accessToken,
  ]);
};

export default useGetAuthLogin;
