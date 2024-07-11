import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useMemo} from 'react';
import {ActivityIndicator} from 'react-native';

import {authNavigations, mainNavigations} from '@/constants/navigations';
import {useUserInfoActions, useUserInfoState} from '@/data/userStore';
import Login from '@/screens/auth/Login';
import CreateFarm from '@/screens/main/farm/CreateFarm';
import useAuth from '@/services/queries/auth/useAuth';
import useGetUserFarm from '@/services/queries/user/useGetUserFarm';
import HomeScreen from '../screens/main/HomeScreen';

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

  console.log('data::: ', data);

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate(mainNavigations.CREATE_FARM);
    } else if (isError) {
      console.log('error: ', isError);
    }
  }, [data, isError, isSuccess, navigation]);

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
  const {setUserInfo, clearUserInfo} = useUserInfoActions();

  const Stack = useMemo(() => createNativeStackNavigator(), []);

  const {isLogin} = useAuth();

  useEffect(() => {
    if (isLogin.isSuccess) {
      setUserInfo(isLogin.data);
    }
  }, [isLogin.data, isLogin.isSuccess, setUserInfo]);

  useEffect(() => {
    if (isLogin.isError) {
      clearUserInfo();
    }
  }, [clearUserInfo, isLogin.isError]);

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
