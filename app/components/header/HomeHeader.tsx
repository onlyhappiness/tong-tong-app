import Coin from '@/assets/icon/coin.png';
import Rainbow from '@/assets/weather/rainbow.png';
// import Sunny from '@/assets/weather/sunny.png'
// import Rainy from '@/assets/weather/rainy.png'

import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Point from '../Point';
import Timer from '../Timer';
import Text from '../ui/Text';

export default ({}) => {
  const {top} = useSafeAreaInsets();

  return (
    <>
      <View style={[styles.container, {paddingTop: top}]}>
        <View style={styles.buttonContainer}>
          <Pressable
            style={{padding: 15, borderRadius: 30, backgroundColor: 'white'}}>
            <Text>펫</Text>
          </Pressable>

          <View style={[styles.button, {justifyContent: 'space-between'}]}>
            <Image source={Rainbow} style={{width: 24, height: 24}} />
            <Text textStyle={{color: 'white', fontWeight: 'bold'}}>
              Rainbow
            </Text>
          </View>
          <View style={[styles.button, {justifyContent: 'center'}]}>
            <Timer />
          </View>
          <View style={[styles.button, {justifyContent: 'space-between'}]}>
            <Image source={Coin} style={{width: 24, height: 24}} />
            <Point />
          </View>
        </View>
      </View>

      {/* <Pressable style={[styles.petButton]}>
        <Text>펫</Text>
      </Pressable> */}

      <Pressable style={[styles.settingButton]}>
        <Text>설정</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    // backgroundColor: '#DEAF85',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    // borderColor: BUTTON.third_hover,
    borderColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  petButton: {
    position: 'absolute',
    left: 8,
    top: 120,
    padding: 15,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  settingButton: {
    position: 'absolute',
    left: 8,
    top: 130,
    padding: 15,
    borderRadius: 30,
    backgroundColor: 'white',
  },
});
