import Background from '@/components/Background';
import BottomTab from '@/components/BottomTab';
import Header from '@/components/Header';
import TestButton from '@/components/TestButton';
import Tutorial from '@/components/Tutorial';
import {useCharacterActions, useCharacterState} from '@/data/characterStore';
import {useGameActions} from '@/data/gameStore';
import useGetPetList from '@/hooks/queries/user/useGetPetList';
import MoveCharacterSystem from '@/utils/MoveSystem';
import setupWorld from '@/utils/setupWorld';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const HomeScreen = () => {
  const {character} = useCharacterState();

  const {setCharacter} = useCharacterActions();

  const {setGameEngineRef} = useGameActions();

  const [entities, setEntities] = useState({});

  const [engineKey, setEngineKey] = useState(0);

  const {data: petData, isLoading, isError} = useGetPetList();

  const shouldShowTutorial = !isLoading && !isError && petData?.length === 0;

  useEffect(() => {
    if (character) {
      setEntities(setupWorld(character));
      setEngineKey(prevKey => prevKey + 1); // key를 변경하여 GameEngine을 다시 렌더링
    }
  }, [character]);

  useEffect(() => {
    if (petData?.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const character = petData?.[0]?.type;
      setCharacter(character);
    }
  }, [petData, setCharacter]);

  return (
    <>
      <SafeAreaProvider>
        <View style={{flex: 1}}>
          <View style={styles.engineContainer}>
            <Header type="home" />

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
            <TestButton />
          </View>

          <BottomTab />
        </View>
      </SafeAreaProvider>

      {/* 튜토리얼 */}
      {shouldShowTutorial && <Tutorial />}
    </>
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
});

export default HomeScreen;
