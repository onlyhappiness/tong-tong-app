import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useMemo} from 'react';

import {authNavigations, mainNavigations} from '@/constants/navigations';
import {useUserInfoActions, useUserInfoState} from '@/data/userStore';
import useAuth from '@/hooks/queries/useAuth';
import {getAuthLogin} from '@/services/apis/auth';
import AuthStack from '@/stack/AuthStack';
import MainStack from '@/stack/MainStack';
import {ActivityIndicator, View} from 'react-native';

const Navigation = () => {
  const {userInfo} = useUserInfoState();

  const {setUserInfo, clearUserInfo} = useUserInfoActions();

  const Stack = useMemo(() => createNativeStackNavigator(), []);

  const {isLoginLoading, isLogin} = useAuth();

  useEffect(() => {
    if (isLogin.isSuccess) {
      setUserInfo(isLogin.data);
    }
  }, [isLogin.isSuccess]);

  useEffect(() => {
    (async () => {
      try {
        const user = await getAuthLogin();
        console.log('user::: ', user);
        setUserInfo(user);
      } catch (error) {
        clearUserInfo();
      }
    })();
  }, [clearUserInfo, setUserInfo]);

  if (isLoginLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

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
