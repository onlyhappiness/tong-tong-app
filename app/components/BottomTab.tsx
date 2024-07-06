import {useGameActions, useGameState} from '@/data/gameStore';
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

const BottomTab = () => {
  const gameRef = useGameState();

  const {setCharacter} = useGameActions();

  return (
    <View style={styles.container}>
      {/* <Text>Bottom</Text> */}
      <Button
        title="하트"
        onPress={() => {
          console.log('gameRef::: ', gameRef);
          // setCharacter('chick');
        }}
      />

      <Button title="씻겨주기" />

      <Button title="먹이주기" />
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
