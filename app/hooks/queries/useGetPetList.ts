import {useUserInfoState} from '@/data/userStore';
import {getUserPetList} from '@/services/apis/user';
import {useQuery} from '@tanstack/react-query';

const useGetPetList = () => {
  const {userInfo} = useUserInfoState();

  return useQuery({
    queryKey: ['petList'],
    queryFn: getUserPetList,
    enabled: !!userInfo,
  });
};

export default useGetPetList;
