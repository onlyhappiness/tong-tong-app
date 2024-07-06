import {useUserInfoActions} from '@/data/userStore';
import {postAuthLogin} from '@/services/apis/auth';
import {setStorage} from '@/utils/storage';
import {useMutation} from '@tanstack/react-query';

const usePostAuthLogin = () => {
  const {setUserInfo} = useUserInfoActions();

  return useMutation({
    mutationFn: postAuthLogin,
    onSuccess: async (res: any) => {
      const token = res?.access_token;
      await setStorage('token', token).then(() => {
        setUserInfo();
      });
    },
  });
};

export default usePostAuthLogin;
