import Background from '@/components/Background';
import BottomTab from '@/components/BottomTab';
import Character from '@/components/Character';
import Button from '@/components/ui/Button';
import {windowWidth} from '@/constants/screenSize';
import {useGameActions} from '@/data/gameStore';
import {useUserInfoActions} from '@/data/userStore';
import MoveCharacterSystem from '@/utils/MoveSystem';
import characterTypes from '@/utils/characterType';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import {
  SafeAreaInsetsContext,
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const HomeScreen = () => {
  const {setGameEngineRef} = useGameActions();

  const [entities, setEntities] = useState({});

  const [engineKey, setEngineKey] = useState(0);

  const [character, setCharacter] = useState<string | null>('chick');

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

  const {clearUserInfo} = useUserInfoActions();

  const test = async () => {
    clearUserInfo();
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
              <Header />
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

              <Button label="테스트" onPress={test} />
            </View>

            <BottomTab />
            {/* <View style={[{height: insets?.bottom || 0}]} /> */}
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
    height: '80%',
  },
  engine: {
    flex: 1,
  },
  character: {
    position: 'absolute',
  },
});

const Header = () => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={{padding: 10, marginTop: top}}>
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
