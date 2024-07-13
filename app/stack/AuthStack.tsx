import {authNavigations} from '@/constants/navigations';
import Login from '@/screens/auth/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';

const AuthStack = () => {
  const Stack = useMemo(() => createNativeStackNavigator(), []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={authNavigations.LOGIN} component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
