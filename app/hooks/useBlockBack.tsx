import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {BackHandler} from 'react-native';

const useBlockBackHandler = () => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // true를 반환하여 기본 뒤로가기를 무시합니다.
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      const unsubscribe = navigation.addListener('beforeRemove', e => {
        e.preventDefault(); // 기본 뒤로가기를 무시합니다.
      });

      return () => {
        backHandler.remove();
        unsubscribe();
      };
    }, [navigation]),
  );
};

export default useBlockBackHandler;
