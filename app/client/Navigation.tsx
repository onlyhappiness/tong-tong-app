import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useMemo} from 'react';

import {authNavigations, mainNavigations} from '@/constants/navigations';
import {useUserInfoActions, useUserInfoState} from '@/data/userStore';
import useAuth from '@/hooks/queries/useAuth';
import AuthStack from '@/stack/AuthStack';
import MainStack from '@/stack/MainStack';

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
