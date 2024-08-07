import {windowHeight} from '@/constants/screenSize';
import useTimeStore from '@/data/timeStore';
import React, {useEffect, useRef} from 'react';
import {Animated, Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Background = (props: any) => {
  const {timeOfDay} = useTimeStore();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const starAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    );
    starAnimation.start();
    return () => starAnimation.stop();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={
          timeOfDay === 'Morning'
            ? ['#2980B9', '#6DD5FA', '#FFFFFF']
            : timeOfDay === 'Afternoon'
            ? ['#7F7FD5', '#86A8E7', '#91EAE4', '#FFFFFF']
            : ['#1A2980', '#26D0CE']
        }
        // colors={['#2980B9', '#6DD5FA', '#FFFFFF']} 아침색상 - 그라데이션 색상 배열
        // colors={['#7F7FD5', '#86A8E7', '#91EAE4', '#FFFFFF']} // 오후 색상
        // colors={['#1A2980', '#26D0CE']} // 저녁 색상
        style={styles.weather}
      />

      <Animated.View style={[styles.stars, {opacity: fadeAnim}]}>
        {Array.from({length: 20}).map((_, index) => (
          <View
            key={index}
            style={[
              styles.star,
              {
                top: `${Math.random() * 50}%`,
                left: `${Math.random() * 100}%`,
              },
            ]}
          />
        ))}
      </Animated.View>

      <Image source={props.image} style={styles.farm} resizeMode="stretch" />
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
  stars: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  star: {
    position: 'absolute',
    width: 3,
    height: 3,
    backgroundColor: 'white',
    borderRadius: 1,
  },
  farm: {
    top: (windowHeight * 0.7) / 1,
    width: '100%',
    height: '20%',
  },
});

export default Background;
