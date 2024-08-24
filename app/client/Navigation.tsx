import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';

import {authNavigations, mainNavigations} from '@/constants/navigations';
import {useUserInfoState} from '@/data/userStore';
import useGetAuthLogin from '@/hooks/queries/auth/useGetAuthLogin';
import AuthStack from '@/stack/AuthStack';
import MainStack from '@/stack/MainStack';

const Navigation = () => {
  const {userInfo} = useUserInfoState();

  useGetAuthLogin();

  // const {setUserInfo, clearUserInfo} = useUserInfoActions();

  const Stack = useMemo(() => createNativeStackNavigator(), []);

  // const {isLoginLoading, isLogin} = useAuth();

  // useEffect(() => {
  //   if (isLogin.isSuccess) {
  //     setUserInfo(isLogin.data);
  //   }
  // }, [isLogin.isSuccess]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const user = await getAuthLogin();
  //       console.log('user::: ', user);
  //       setUserInfo(user);
  //     } catch (error) {
  //       clearUserInfo();
  //     }
  //   })();
  // }, [clearUserInfo, setUserInfo]);

  // if (isLoginLoading) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator />
  //     </View>
  //   );
  // }

  console.log('userInfo:: ', userInfo);

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
