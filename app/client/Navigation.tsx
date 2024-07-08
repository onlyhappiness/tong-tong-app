import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useMemo} from 'react';

import {authNavigations, mainNavigations} from '@/constants/navigations';
import {useUserInfoActions, useUserInfoState} from '@/data/userStore';
import Login from '@/screens/auth/Login';
import CreateFarm from '@/screens/farm/CreateFarm';
import useAuth from '@/services/queries/auth/useAuth';
import useGetUserFarm from '@/services/queries/user/useGetUserFarm';
import {ActivityIndicator} from 'react-native';
import HomeScreen from '../screens/HomeScreen';

const AuthStack = () => {
  const Stack = useMemo(() => createNativeStackNavigator(), []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={authNavigations.LOGIN} component={Login} />
    </Stack.Navigator>
  );
};

// 메인 stack
const MainStack = () => {
  const navigation = useNavigation();

  const {data, isSuccess, isError, isLoading} = useGetUserFarm();

  const Stack = useMemo(() => createNativeStackNavigator(), []);

  // useEffect(() => {
  //   if (isSuccess) {
  //     console.log('userFarm:: ', data);
  //     navigation.navigate(mainNavigations.CREATE_FARM);
  //   } else if (isError) {
  //     console.log('error: ', isError);
  //   }
  // }, [data, isError, isSuccess, navigation]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={mainNavigations.HOME} component={HomeScreen} />

      <Stack.Screen name={mainNavigations.CREATE_FARM} component={CreateFarm} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const {userInfo} = useUserInfoState();
  const {setUserInfo} = useUserInfoActions();

  const Stack = useMemo(() => createNativeStackNavigator(), []);

  const {isLogin} = useAuth();

  useEffect(() => {
    if (isLogin.isSuccess) {
      setUserInfo(isLogin.data);
    }
  }, [isLogin.data, isLogin.isSuccess, setUserInfo]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!userInfo ? (
          <Stack.Screen name={authNavigations.STACK} component={AuthStack} />
        ) : (
          <Stack.Screen name={mainNavigations.STACK} component={MainStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
