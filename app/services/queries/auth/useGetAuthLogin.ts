import {getEncryptStorage} from '@/utils/storage';

const useGetAuthLogin = async () => {
  const accessToken = await getEncryptStorage('access_token');

  console.log('accessToken::', accessToken);
};

export default useGetAuthLogin;
