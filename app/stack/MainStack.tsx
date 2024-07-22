import {mainNavigations} from '@/constants/navigations';
import useGetUserFarm from '@/hooks/queries/useGetUserFarm';
import useGetUserPoint from '@/hooks/queries/useGetUserPoint';
import CreateFarm from '@/screens/farm/CreateFarm';
import HomeScreen from '@/screens/main/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import {ActivityIndicator, View} from 'react-native';

// 메인 stack
const MainStack = () => {
  const Stack = useMemo(() => createNativeStackNavigator(), []);

  const {
    data: userFarm,
    isError: isUserFarmError,
    isLoading: isUserFarmLoading,
  } = useGetUserFarm();

  const {data: userPoint, isLoading: isUserPointLoading} = useGetUserPoint();

  // useEffect(() => {
  //   if (isUserFarmError) {
  //     console.log('error: ', isUserFarmError);
  //   }
  // }, [isUserFarmError]);

  if (isUserFarmLoading || isUserPointLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!userFarm && (
        <Stack.Screen
          name={mainNavigations.CREATE_FARM}
          component={CreateFarm}
        />
      )}

      <Stack.Screen name={mainNavigations.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
