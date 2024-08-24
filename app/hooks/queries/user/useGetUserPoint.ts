import {useUserInfoState} from '@/data/userStore';
import {getUserPoint} from '@/services/apis/user';
import {useQuery} from '@tanstack/react-query';

const useGetUserPoint = () => {
  const {userInfo} = useUserInfoState();

  return useQuery({
    queryKey: ['userPoint'],
    queryFn: () => getUserPoint(),
    enabled: !!userInfo,
  });
};

export default useGetUserPoint;
