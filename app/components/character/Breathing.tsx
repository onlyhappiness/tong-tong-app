import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

const App = () => {
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
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/egg.png')}
        style={[styles.box, {transform: [{scaleY}]}]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});

export default App;