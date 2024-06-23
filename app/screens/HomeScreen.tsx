import Background from '@/components/Background';
import Character from '@/components/Character';
import Egg from '@/components/Egg';
import {windowWidth} from '@/constants/screenSize';
import MoveCharacterSystem from '@/utils/MoveSystem';
import characterTypes from '@/utils/characterType';
import React, {useRef, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {GameEngine} from 'react-native-game-engine';

const HomeScreen = () => {
  const gameEngine = useRef<any>(null);

  const [character, setCharacter] = useState<any>('chick');

  const handleChangeStatus = (state: string) => {
    const currentEntities = gameEngine.current.props;
    const entities = currentEntities.entities;
    entities.status = state;

    // console.log('currentEntities:: ', entities);
  };

  const setupWorld = (characterType: string) => {
    const selectedCharacter = characterTypes[characterType];

    return {
      background: {
        image: require('../assets/farm/background-remove.png'),
        renderer: Background,
      },
      character: {
        position: [windowWidth / 2, 200],
        size: [selectedCharacter.size, selectedCharacter.size],
        state: 0,
        imageIndex: 0,
        leftImages: selectedCharacter.leftImages,
        rightImages: selectedCharacter.rightImages,
        // 멈춤 상태의 이미지
        idleImages: selectedCharacter.idleImages,
        image: selectedCharacter.idleImages[0], // 초기 이미지를 멈춤 상태 이미지로 설정
        renderer: Character,

        // 캐릭터 이벤트
        // onPress: handleCharacterPress,
        onPress: () => {
          handleChangeStatus('stop');
        },
      },
    };
  };

  const entities = setupWorld(character);

  return (
    <View style={[styles.container]}>
      {character === 'egg' ? (
        <Egg />
      ) : (
        <View style={styles.engineContainer}>
          <GameEngine
            ref={gameEngine}
            style={[styles.engine]}
            systems={[MoveCharacterSystem]}
            entities={entities}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  engineContainer: {
    width: '100%',
    height: '70%',
  },
  engine: {
    flex: 1,
    backgroundColor: 'gray',
  },
  character: {
    position: 'absolute',
  },
});

const test = () => {
  return (
    <View
      style={{
        padding: 30,
        // position: 'absolute',
        top: 0,
        backgroundColor: 'yellow',
      }}>
      <Button
        title="멈춤"
        onPress={() => {
          handleChangeStatus('stop');
        }}
      />
      <Button
        title="다시 움직이기"
        onPress={() => {
          handleChangeStatus('start');
        }}
      />
    </View>
  );
};

export default HomeScreen;
