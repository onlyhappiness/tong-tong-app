import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';

import {authNavigations, mainNavigations} from '@/constants/navigations';
import {useUserInfoState} from '@/data/userStore';
import Login from '@/screens/auth/Login';
import useGetAuthLogin from '@/services/queries/auth/useGetAuthLogin';
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
  const Stack = useMemo(() => createNativeStackNavigator(), []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={mainNavigations.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const {userInfo} = useUserInfoState();

  const Stack = useMemo(() => createNativeStackNavigator(), []);

  useGetAuthLogin();

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
