import {screenHeight} from '@/constants/screenSize';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const Character = (props: any) => {
  const [showDialog, setShowDialog] = useState(false);

  const width = props.size[0];
  const height = props.size[1];
  const x = props.position[0] - width / 2;
  const y = screenHeight / 1.8;

  useEffect(() => {
    const interval = setInterval(() => {
      setShowDialog(prev => {
        if (prev === true) {
          return false;
        }
        return prev;
      });
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
    <View style={[styles.container, {left: x, top: y}]}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View>
          {showDialog && (
            <View style={styles.dialog}>
              <Text style={styles.dialogText}>Hello!</Text>
            </View>
          )}
          <Image
            source={props.image}
            style={[styles.character, {width: width, height: height}]}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
