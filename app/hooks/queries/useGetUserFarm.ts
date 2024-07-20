import {useUserInfoState} from '@/data/userStore';
import {getUserFarm} from '@/services/apis/user';
import {useQuery} from '@tanstack/react-query';

const useGetUserFarm = () => {
  const {userInfo} = useUserInfoState();

  return useQuery({
    queryKey: ['userFarm'],
    queryFn: () => getUserFarm(),
    enabled: !!userInfo,
  });
};

export default useGetUserFarm;
