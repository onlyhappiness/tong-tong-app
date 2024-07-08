import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';

const {width, height} = Dimensions.get('window');

const ShootingStarEffect = ({onAnimationEnd}) => {
  return (
    <View style={styles.container}>
      <ShootingStar onAnimationEnd={onAnimationEnd} />
    </View>
  );
};

const ShootingStar = ({onAnimationEnd}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const startX = Math.random() * width;
  const duration = 2000;

  useEffect(() => {
    const starAnimation = Animated.parallel([
      Animated.timing(translateX, {
        toValue: width,
        duration: duration,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: height,
        duration: duration,
        useNativeDriver: true,
      }),
    ]);

    starAnimation.start(onAnimationEnd);

    return () => starAnimation.stop();
  }, [translateX, translateY, onAnimationEnd]);

  return (
    <Animated.View
      style={[
        styles.star,
        {
          top: 0,
          left: startX,
          transform: [{translateX}, {translateY}],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black', // 어두운 밤하늘 배경
  },
  star: {
    position: 'absolute',
    width: 5,
    height: 5,
    backgroundColor: 'white', // 흰색 별똥별
    borderRadius: 2.5,
    opacity: 0.8,
  },
});

export default ShootingStarEffect;
