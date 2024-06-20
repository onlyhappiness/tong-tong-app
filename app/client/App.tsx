import React, {useEffect, useState} from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import {
  useLeftWalkingAnimation,
  useRightWalkingAnimation,
} from '../hooks/useWalking';

const {width} = Dimensions.get('window');

const App = () => {
  const [currentPosition, setCurrentPosition] = useState(0); // 시작 위치를 중앙으로 설정
  const [direction, setDirection] = useState('left');
  // const [direction, setDirection] = useState(
  //   Math.random() > 0.5 ? 'left' : 'right',
  // );

  const {
    positionX: leftPositionX,
    opacity1: leftOpacity1,
    opacity2: leftOpacity2,
    isFinished: isLeftFinished,
  } = useLeftWalkingAnimation(currentPosition, -width + 300);

  const {
    positionX: rightPositionX,
    opacity1: rightOpacity1,
    opacity2: rightOpacity2,
    isFinished: isRightFinished,
  } = useRightWalkingAnimation(currentPosition, width - 300);

  useEffect(() => {
    if (isLeftFinished) {
      setCurrentPosition(-width + 300);
      setDirection('right');
    } else if (isRightFinished) {
      setCurrentPosition(width - 300);
      setDirection('left');
    }
  }, [isLeftFinished, isRightFinished]);

  return (
    <View style={styles.container}>
      {direction === 'left' ? (
        <>
          {/* 왼쪽으로 이동하는 애니메이션 */}
          <Animated.Image
            source={require('../assets/left-1.png')}
            style={[
              styles.image,
              {transform: [{translateX: leftPositionX}], opacity: leftOpacity1},
            ]}
            resizeMode="contain"
          />
          <Animated.Image
            source={require('../assets/left-2.png')}
            style={[
              styles.image,
              {transform: [{translateX: leftPositionX}], opacity: leftOpacity2},
            ]}
            resizeMode="contain"
          />
        </>
      ) : (
        <>
          {/* 오른쪽으로 이동하는 애니메이션 */}
          <Animated.Image
            source={require('../assets/right-1.png')}
            style={[
              styles.image,
              {
                transform: [{translateX: rightPositionX}],
                opacity: rightOpacity1,
              },
            ]}
            resizeMode="contain"
          />
          <Animated.Image
            source={require('../assets/right-2.png')}
            style={[
              styles.image,
              {
                transform: [{translateX: rightPositionX}],
                opacity: rightOpacity2,
              },
            ]}
            resizeMode="contain"
          />
        </>
      )}
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
  image: {
    width: 100,
    height: 100,
    position: 'absolute',
  },
});

export default App;
