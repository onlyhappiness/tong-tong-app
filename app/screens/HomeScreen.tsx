import Background from '@/components/Background';
import Character from '@/components/Character';
import {windowWidth} from '@/constants/screenSize';
import MainLayout from '@/layouts/MainLayout';
import MoveCharacterSystem from '@/utils/MoveSystem';
import characterTypes from '@/utils/characterType';
import React, {useRef, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {GameEngine} from 'react-native-game-engine';

const HomeScreen = () => {
  const gameRef = useRef<any>(null);

  const [character, setCharacter] = useState<any>('chick');

  // // 펫 상태 변경
  const handleChangeStatus = (state: string) => {
    const currentEntities = gameRef.current.props;
    const entities = currentEntities.entities;
    entities.status = state;
  };

  const setupWorld = (characterType: string) => {
    const selectedCharacter = characterTypes[characterType];

    return {
      character: {
        type: character,
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

  const entities = character ? setupWorld(character) : {};

  return (
    <MainLayout>
      <View style={styles.engineContainer}>
        <Header />
        <Background image={require('../assets/farm/background.png')} />
        {character && (
          <GameEngine
            ref={gameRef}
            style={[styles.engine]}
            systems={[MoveCharacterSystem]}
            entities={entities}
          />
        )}
      </View>

      <View style={styles.bottom}>
        <Text>Bottom</Text>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  engineContainer: {
    width: '100%',
    height: '85%',
    // borderWidth: 3,
    // borderBlockColor: 'red',
  },
  engine: {
    flex: 1,
  },
  character: {
    position: 'absolute',
  },
  bottom: {
    backgroundColor: '#DEAF85',
    height: '15%',
  },
});

const Header = () => {
  return (
    <View style={{padding: 10}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          gap: 30,
          marginTop: 10,
        }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'white',
            flex: 1,
            paddingVertical: 15,
          }}>
          <Text>날씨</Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'white',
            flex: 1,
            paddingVertical: 15,
          }}>
          <Text>시간</Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'white',
            flex: 1,
            paddingVertical: 15,
          }}>
          <Text>포인트</Text>
        </View>
      </View>
    </View>
  );
};

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
