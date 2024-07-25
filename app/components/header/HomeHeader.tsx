import Coin from '@/assets/icon/coin.png';
import Rainbow from '@/assets/weather/rainbow.png';
// import Sunny from '@/assets/weather/sunny.png'
// import Rainy from '@/assets/weather/rainy.png'

import {BUTTON} from '@/constants/color';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Point from '../Point';
import Timer from '../Timer';
import Text from '../ui/Text';

export default ({}) => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Image source={Rainbow} style={{width: 24, height: 24}} />
          <Text>Rainbow</Text>
        </View>
        <View style={styles.button}>
          <Timer />
        </View>
        <View style={styles.button}>
          <Image source={Coin} style={{width: 24, height: 24}} />
          <Point />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#DEAF85',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 15,
    marginTop: 10,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: BUTTON.third_hover,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
  },
});
