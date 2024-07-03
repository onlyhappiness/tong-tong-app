import {postAuthLogin} from '@/services/apis/auth';
import {useMutation} from '@tanstack/react-query';

const usePostAuthLogin = () => {
  return useMutation({
    mutationFn: postAuthLogin,
    onSuccess: res => {
      console.log('res::', res);
      // setEncryptStorage()
    },
  });
};

export default usePostAuthLogin;
