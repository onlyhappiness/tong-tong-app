import {getAuthLogin, postAuthLogin} from '@/services/apis/auth';
import {setStorage} from '@/utils/storage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

function useAuthLogin() {
  const queryClient = useQueryClient();

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

function useGetAuthLogin(queryOptions?: any) {
  const {data, isSuccess, isError, isLoading} = useQuery({
    queryFn: getAuthLogin,
    queryKey: ['auth', 'getAuthLogin'],
    ...queryOptions,
  });

  console.log({data, isSuccess, isError, isLoading});

  return {
    data,
    isSuccess,
    isError,
    isLoading,
  };
}

function useAuth() {
  const loginMutation = useAuthLogin();
  const getLoginQuery = useGetAuthLogin({
    enabled: loginMutation.isSuccess,
  });

  return {
    loginMutation,
    getLoginQuery,
    isLogin: getLoginQuery,
    isLoginLoading: getLoginQuery.isLoading,
  };
}

export default useAuth;
