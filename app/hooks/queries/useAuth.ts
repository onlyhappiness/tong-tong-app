import {getAuthLogin, postAuthLogin} from '@/services/apis/auth';
import {setStorage} from '@/utils/storage';
import {
  QueryClient,
  useMutation,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

function useAuthLogin() {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: postAuthLogin,
    onSuccess: ({access_token: accessToken}) => {
      setStorage('token', accessToken);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['auth', 'getAuthLogin'],
      });
    },
  });
}

function useGetAuthLogin(queryOptions?: UseQueryOptions) {
  return useQuery({
    queryFn: getAuthLogin,
    queryKey: ['auth', 'getAuthLogin'],
    ...queryOptions,
  });
}

function useAuth() {
  const loginMutation = useAuthLogin();
  const getLoginQuery = useGetAuthLogin({
    enabled: loginMutation.isSuccess,
  });
  const isLogin = useGetAuthLogin();

  return {
    loginMutation,
    getLoginQuery,
    isLogin,
  };
}

export default useAuth;
