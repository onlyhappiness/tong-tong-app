import {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';

const useLeftWalkingAnimation = (startX, toValue) => {
  const positionX = useRef(new Animated.Value(startX)).current;
  const opacity1 = useRef(new Animated.Value(1)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    positionX.setValue(startX); // 초기 위치를 설정합니다.

    // 발 교차 애니메이션
    const stepAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity1, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity1, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    );

    const stepAnimation2 = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity2, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity2, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    );

    // 걸어가는 애니메이션
    const walkAnimation = Animated.timing(positionX, {
      toValue: toValue, // 왼쪽 끝으로 이동
      duration: 3000,
      useNativeDriver: true,
    });

    walkAnimation.start(() => {
      stepAnimation.stop();
      stepAnimation2.stop();
      setIsFinished(true); // 애니메이션이 끝나면 상태를 업데이트
    });

    stepAnimation.start();
    stepAnimation2.start();

    return () => {
      walkAnimation.stop();
      stepAnimation.stop();
      stepAnimation2.stop();
    };
  }, [positionX, opacity1, opacity2, startX, toValue]);

  return {positionX, opacity1, opacity2, isFinished};
};

const useRightWalkingAnimation = (startX, toValue) => {
  const positionX = useRef(new Animated.Value(startX)).current;
  const opacity1 = useRef(new Animated.Value(1)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    positionX.setValue(startX); // 초기 위치를 설정합니다.

    // 발 교차 애니메이션
    const stepAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity1, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity1, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    );

    const stepAnimation2 = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity2, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity2, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    );

    // 걸어가는 애니메이션
    const walkAnimation = Animated.timing(positionX, {
      toValue: toValue, // 오른쪽 끝으로 이동
      duration: 3000,
      useNativeDriver: true,
    });

    walkAnimation.start(() => {
      stepAnimation.stop();
      stepAnimation2.stop();
      setIsFinished(true); // 애니메이션이 끝나면 상태를 업데이트
    });

    stepAnimation.start();
    stepAnimation2.start();

    return () => {
      walkAnimation.stop();
      stepAnimation.stop();
      stepAnimation2.stop();
    };
  }, [positionX, opacity1, opacity2, startX, toValue]);

  return {positionX, opacity1, opacity2, isFinished};
};

export {useLeftWalkingAnimation, useRightWalkingAnimation};
