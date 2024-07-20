import Background from '@/components/Background';
import BottomTab from '@/components/BottomTab';
import Character from '@/components/Character';
import Header from '@/components/Header';
import {windowWidth} from '@/constants/screenSize';
import {useCharacterActions, useCharacterState} from '@/data/characterStore';
import {useGameActions} from '@/data/gameStore';
import MoveCharacterSystem from '@/utils/MoveSystem';
import characterTypes from '@/utils/characterType';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import {
  SafeAreaInsetsContext,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

const HomeScreen = () => {
  const {character} = useCharacterState();

  const {setCharacter} = useCharacterActions();

  const {setGameEngineRef} = useGameActions();

  const [entities, setEntities] = useState({});

  const [engineKey, setEngineKey] = useState(0);

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

  const test = async () => {
    // clearUserInfo();
    setCharacter('chick');
  };

  useEffect(() => {
    if (character) {
      setEntities(setupWorld(character));
      setEngineKey(prevKey => prevKey + 1); // key를 변경하여 GameEngine을 다시 렌더링
    }
  }, [character]);

  return (
    <SafeAreaProvider>
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View style={{flex: 1}}>
            <View style={styles.engineContainer}>
              <Header type="home" />

              <Pressable style={[styles.petButton]}>
                <Text>펫</Text>
              </Pressable>

              <Background image={require('../../assets/farm/background.png')} />

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
              {/* <Button label="테스트" onPress={test} /> */}
            </View>

            <BottomTab />
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  engineContainer: {
    width: '100%',
    height: '82%',
  },
  engine: {
    flex: 1,
  },
  character: {
    position: 'absolute',
  },
  petButton: {
    position: 'absolute',
    left: 5,
    top: 150,
    padding: 15,
    borderRadius: 30,
    backgroundColor: 'white',
  },
});

export default HomeScreen;
