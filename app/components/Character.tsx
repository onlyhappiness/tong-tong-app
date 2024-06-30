import {windowHeight} from '@/constants/screenSize';
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
  const [showDialog, setShowDialog] = useState(false);

  const width = props.size[0];
  const height = props.size[1];
  const x = props.position[0] - width / 2;
  const y =
    props.size[0] === 70
      ? (windowHeight * 0.7) / 1.25
      : (windowHeight * 0.7) / 1.1;

  useEffect(() => {
    const interval = setInterval(() => {
      setShowDialog(prev => {
        if (prev === true) {
          return false;
        }
        return prev;
      });
      // setPetStatus(gameEngine, 'start');
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePress = () => {
    console.log('Character pressed');

    setShowDialog(!showDialog);
    if (props.onPress) {
      props.onPress();
    }
  };

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
