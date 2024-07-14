import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';

const Egg = () => {
  const scaleY = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const breathingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleY, {
          toValue: 1.2,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(scaleY, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    breathingAnimation.start();
    return () => breathingAnimation.stop(); // Clean up the animation on component unmount
  }, [scaleY]);

  return (
    <Animated.Image
      source={require('../assets/egg.png')}
      style={[styles.egg, {transform: [{scaleY}]}]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  egg: {
    position: 'absolute',
    top: 0,
    width: 80,
    height: 80,
  },
});

export default Egg;
