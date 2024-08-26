import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';

import {Center} from '@/components/ui/Stack';
import {authNavigations, mainNavigations} from '@/constants/navigations';
import {useUserInfoState} from '@/data/userStore';
import useGetAuthLogin from '@/hooks/queries/auth/useGetAuthLogin';
import AuthStack from '@/stack/AuthStack';
import MainStack from '@/stack/MainStack';
import {ActivityIndicator} from 'react-native';

const Navigation = () => {
  const {userInfo} = useUserInfoState();

  const {isLoading: isLoginLoading} = useGetAuthLogin();

  const Stack = useMemo(() => createNativeStackNavigator(), []);

  if (isLoginLoading) {
    return (
      <Center>
        <ActivityIndicator />
      </Center>
    );
  }

  // console.log('isLoginLoading:', isLoginLoading);
  // console.log('userInfo:: ', userInfo);

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
