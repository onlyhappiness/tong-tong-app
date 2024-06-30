import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';

import {mainNavigations} from '@/constants/navigations';
import Login from '@/screens/auth/Login';
import useGetAuthLogin from '@/services/queries/auth/useGetAuthLogin';
import HomeScreen from '../screens/HomeScreen';

const AuthStack = () => {
  const Stack = useMemo(() => createNativeStackNavigator(), []);

  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="" component={Login} />
  </Stack.Navigator>;
};

// 메인 stack
const MainStack = () => {
  const Stack = useMemo(() => createNativeStackNavigator(), []);

  <Stack.Navigator>
    <Stack.Screen name={mainNavigations.HOME} component={HomeScreen} />
  </Stack.Navigator>;
};

const Navigation = () => {
  useGetAuthLogin();

  const Stack = useMemo(() => createNativeStackNavigator(), []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={mainNavigations.HOME} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
