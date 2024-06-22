import Character from '@/components/Character';
import Egg from '@/components/Egg';
import {screenWidth} from '@/constants/screenSize';
import MoveCharacterSystem from '@/utils/MoveSystem';
import characterTypes from '@/utils/characterType';
import React, {useRef, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {GameEngine} from 'react-native-game-engine';

const HomeScreen = () => {
  const gameEngine = useRef(null);

  const [status, setStatus] = useState<any>('start');

  const [character, setCharacter] = useState('chick');

  const handleCharacterPress = () => {
    // console.log('test:: ');
  };

  const setupWorld = (characterType: string) => {
    const selectedCharacter = characterTypes[characterType];

    return {
      character: {
        position: [screenWidth / 2, 200],
        size: [70, 70],
        state: 0,
        imageIndex: 0,
        leftImages: selectedCharacter.leftImages,
        rightImages: selectedCharacter.rightImages,
        // 멈춤 상태의 이미지
        idleImages: selectedCharacter.idleImages,
        image: selectedCharacter.idleImages[0], // 초기 이미지를 멈춤 상태 이미지로 설정
        renderer: Character,

        // 캐릭터 이벤트
        onPress: handleCharacterPress,
      },
    };
  };

  const entities = setupWorld(character);

  return (
    <View style={styles.container}>
      {character === 'egg' ? (
        <Egg />
      ) : (
        <GameEngine
          ref={gameEngine}
          style={styles.container}
          systems={[MoveCharacterSystem]}
          entities={{...entities, status}}
        />
      )}

      <View style={{padding: 30}}>
        <Button
          title="테스트"
          onPress={() => {
            setStatus('stop');
            // setCharacter('egg');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  character: {
    position: 'absolute',
  },
});

export default HomeScreen;
