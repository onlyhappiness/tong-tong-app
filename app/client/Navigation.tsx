import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';

import {mainNavigations} from '@/constants/navigations';
import HomeScreen from '../screens/HomeScreen';

const Navigation = () => {
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
