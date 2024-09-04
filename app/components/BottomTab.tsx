import {useCharacterActions} from '@/data/characterStore';
import {useGameState} from '@/data/gameStore';
import {setPetStatus} from '@/utils/petStatus';
import React from 'react';
import {Button, ScrollView, StyleSheet, View} from 'react-native';
import UserCircle from './UserCircle';

const BottomTab = () => {
  const gameRef = useGameState();
  // const {setGameEngineRef} = useGameActions();

  const {setCharacter} = useCharacterActions();

  return (
    <View style={styles.container}>
      <UserCircle />

      <ScrollView
        horizontal={true}
        style={{
          marginHorizontal: 10,
          height: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            gap: 30,
            alignItems: 'center',
          }}>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DEAF85',
    height: '16%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default BottomTab;
