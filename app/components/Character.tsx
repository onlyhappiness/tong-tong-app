import {windowHeight} from '@/constants/screenSize';
import {useGameState} from '@/data/gameStore';
import useTimeStore from '@/data/timeStore';
import {setPetStatus} from '@/utils/petStatus';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Egg from './Egg';

const Character = (props: any) => {
  const gameRef = useGameState();

  const {timeOfDay} = useTimeStore();

  const [showDialog, setShowDialog] = useState(false);

  const width = props.size[0];
  const height = props.size[1];
  const x = props.position[0] - width / 2;
  const y =
    props.size[0] === 70
      ? (windowHeight * 0.7) / 1.35
      : (windowHeight * 0.7) / 1.35;

  const handlePress = () => {
    // console.log('Character pressed', gameRef);

    setShowDialog(!showDialog);
    setPetStatus(gameRef, 'stop');
  };

  useEffect(() => {
    if (showDialog) {
      const interval = setInterval(() => {
        setShowDialog(prev => {
          if (prev === true) {
            return false;
          }
          return prev;
        });
        setPetStatus(gameRef, 'start');
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [gameRef, showDialog]);

  // useEffect(() => {
  //   if (timeOfDay === 'Evening' || 'Night') {
  //     setPetStatus(gameRef, 'stop');
  //   }
  // }, [gameRef, timeOfDay]);

  // console.log('timeOfDay: ', timeOfDay);

  return (
    <View style={[styles.container, {left: x, top: y, zIndex: 50}]}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View>
          {showDialog && (
            <View style={styles.dialog}>
              <Text style={styles.dialogText}>Hello!</Text>
            </View>
          )}
          {props.type === 'egg' ? (
            <View style={{width: '100%'}}>
              <Egg />
            </View>
          ) : (
            <Image
              source={props.image}
              style={[styles.character, {width: width, height: height}]}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  character: {
    position: 'absolute',
  },
  dialog: {
    position: 'absolute',
    bottom: 20,
    minWidth: 100,
    minHeight: 50,
    padding: 5,
    left: -10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogText: {
    fontSize: 12,
    color: 'black',
  },
});

export default Character;
