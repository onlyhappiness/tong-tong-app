import Background from '@/components/Background';
import BottomTab from '@/components/BottomTab';
import Character from '@/components/Character';
import {windowWidth} from '@/constants/screenSize';
import {useGameActions} from '@/data/gameStore';
import MainLayout from '@/layouts/MainLayout';
import MoveCharacterSystem from '@/utils/MoveSystem';
import characterTypes from '@/utils/characterType';
import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {GameEngine} from 'react-native-game-engine';

const HomeScreen = () => {
  const {setGameEngineRef} = useGameActions();

  const [entities, setEntities] = useState({});

  const [engineKey, setEngineKey] = useState(0);

  const [character, setCharacter] = useState<string | null>('egg');

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
        onPress: () => {},
      },
    };
  };

  useEffect(() => {
    if (character) {
      setEntities(setupWorld(character));
      setEngineKey(prevKey => prevKey + 1); // key를 변경하여 GameEngine을 다시 렌더링
    }
  }, [character]);

  return (
    <MainLayout>
      <View style={styles.engineContainer}>
        <Header />
        <Background image={require('../assets/farm/background.png')} />

        {character && (
          <GameEngine
            key={engineKey} // key prop을 추가하여 엔진을 다시 렌더링
            ref={ref => {
              setGameEngineRef(ref);
            }}
            style={[styles.engine]}
            systems={[MoveCharacterSystem]}
            entities={entities}
          />
        )}

        <Button
          title="캐릭터 테스트"
          onPress={() => {
            console.log('테스트');
            setCharacter('chick');
          }}
        />
      </View>

      <BottomTab />
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

export default HomeScreen;
