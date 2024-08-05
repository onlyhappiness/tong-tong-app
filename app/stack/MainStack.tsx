import {mainNavigations} from '@/constants/navigations';
import useGetUserFarm from '@/hooks/queries/useGetUserFarm';
import useGetUserPoint from '@/hooks/queries/useGetUserPoint';
import CreateFarm from '@/screens/farm/CreateFarm';
import HomeScreen from '@/screens/main/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import {ActivityIndicator, View} from 'react-native';

// 메인 stack
const MainStack = () => {
  const Stack = useMemo(() => createNativeStackNavigator(), []);

  const {data: userFarm, isLoading: isUserFarmLoading} = useGetUserFarm();

  const {isLoading: isUserPointLoading} = useGetUserPoint();

  if (isUserFarmLoading || isUserPointLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!userFarm && (
        <Stack.Screen
          name={mainNavigations.CREATE_FARM}
          component={CreateFarm}
        />
      )}

      {/* TODO: 펫이 없다면 튜토리얼로 이동 */}
      {/* 튜토리얼은 modal로 보여줄 수 있고, 화면으로 보여줄 수도 있음. */}
      {/* 빗이나 장난감 등을 사면, 달성 완료 modal을 보여줌 */}
      {/* 이후, 펫이 놀러왔다는 modal을 보여줌 */}

      <Stack.Screen name={mainNavigations.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
