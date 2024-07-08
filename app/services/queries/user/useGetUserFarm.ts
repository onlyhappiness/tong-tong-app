import {useUserInfoState} from '@/data/userStore';
import {getUserFarm} from '@/services/apis/user';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';

const useGetUserFarm = () => {
  const {userInfo} = useUserInfoState();

  const navigation = useNavigation<unknown>();

  return useQuery({
    queryKey: ['userFarm'],
    queryFn: () => getUserFarm(),
    enabled: !!userInfo,
  });
  // const {data, isSuccess, isError} = useQuery({
  //   queryKey: ['userFarm'],
  //   queryFn: () => getUserFarm(),
  //   enabled: !!userInfo,
  // });

  // useEffect(() => {
  //   if (isSuccess) {
  //     console.log('userFarm:: ', data);
  //     navigation.navigate(mainNavigations.CREATE_FARM);
  //   } else if (isError) {
  //     console.log('error: ', isError);
  //   }
  // }, [data, isError, isSuccess, navigation]);
};

export default useGetUserFarm;
