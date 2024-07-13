import {mainNavigations} from '@/constants/navigations';
import useGetUserFarm from '@/hooks/queries/useGetUserFarm';
import CreateFarm from '@/screens/farm/CreateFarm';
import HomeScreen from '@/screens/main/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useMemo} from 'react';
import {ActivityIndicator} from 'react-native';

// 메인 stack
const MainStack = () => {
  const Stack = useMemo(() => createNativeStackNavigator(), []);

  const {
    data: userFarm,
    isError: isUserFarmError,
    isLoading: isUserFarmLoading,
  } = useGetUserFarm();

  useEffect(() => {
    if (isUserFarmError) {
      console.log('error: ', isUserFarmError);
    }
  }, [isUserFarmError]);

  if (isUserFarmLoading) {
    return <ActivityIndicator />;
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
