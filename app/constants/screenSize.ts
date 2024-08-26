import {Dimensions} from 'react-native';

// 보이는 application window의 크기
export const {width: windowWidth, height: windowHeight} =
  Dimensions.get('window');

// device 크기
export const {width: screenWidth, height: screenHeight} =
  Dimensions.get('screen');
