import {windowHeight} from '@/constants/screenSize';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const Background = (props: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.weather} />
      <Image
        source={props.image}
        style={styles.background}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    height: '100%',
  },
  weather: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  background: {
    // position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    top: (windowHeight * 0.7) / 1.5,
    width: '100%',
    height: '35%',
  },
});

export default Background;
