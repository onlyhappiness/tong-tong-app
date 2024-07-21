import {useCharacterActions} from '@/data/characterStore';
import {useGameActions, useGameState} from '@/data/gameStore';
import {setPetStatus} from '@/utils/petStatus';
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

const BottomTab = () => {
  const gameRef = useGameState();
  const {setGameEngineRef} = useGameActions();

  const {setCharacter} = useCharacterActions();

  return (
    <View style={styles.container}>
      <Button
        title="하트"
        onPress={() => {
          setCharacter('poodle');
        }}
      />

      <Button
        title="씻겨주기"
        onPress={() => {
          setPetStatus(gameRef, 'stop');
        }}
      />

      <Button
        title="먹이주기"
        onPress={() => {
          setPetStatus(gameRef, 'start');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DEAF85',
    height: '18%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default BottomTab;
