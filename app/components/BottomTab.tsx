import {useGameActions, useGameState} from '@/data/gameStore';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const BottomTab = () => {
  const gameRef = useGameState();

  const {setCharacter} = useGameActions();

  return (
    <View style={styles.container}>
      <Text>Bottom</Text>
      <Button
        title="테스트"
        onPress={() => {
          console.log('gameRef::: ', gameRef);
          setCharacter('chick');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DEAF85',
    height: '15%',
  },
});

export default BottomTab;
