import useTimeStore from '@/data/timeStore';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';

export default () => {
  const {gameTime, timeOfDay, setGameTime, updateTimeOfDay} = useTimeStore();

  useEffect(() => {
    // 앱 시작 시 현재 시간의 시간(hour)로 gameTime 설정
    const now = new Date();
    const initialGameTime = now.getHours();
    setGameTime(initialGameTime);
    updateTimeOfDay(initialGameTime);
  }, [setGameTime, updateTimeOfDay]);

  useEffect(() => {
    // 10분마다 gameTime을 1씩 증가
    const interval = setInterval(() => {
      const newTime = (gameTime + 1) % 24;
      setGameTime(newTime);

      updateTimeOfDay(newTime);
    }, 1800000); // 600000ms = 10분

    return () => clearInterval(interval);
  }, [gameTime, setGameTime, updateTimeOfDay]);

  // const performActivity = () => {
  //   setGameTime(prevTime => (prevTime + 1) % 24); // 활동 완료 시 1시간 증가
  //   updateTimeOfDay((gameTime + 1) % 24);
  // };

  return (
    <View>
      {/* <Text style={{color: 'white'}}>{timeOfDay}</Text> */}
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
        {Math.floor(gameTime)}:00
      </Text>
    </View>
  );
};
