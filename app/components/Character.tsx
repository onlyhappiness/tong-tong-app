import {screenHeight} from '@/constants/screenSize';
import React from 'react';
import {Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';

const Character = React.memo((props: any) => {
  const width = props.size[0];
  const height = props.size[1];
  const x = props.position[0] - width / 2;
  const y = screenHeight / 2;

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <Image
        source={props.image}
        style={[
          styles.character,
          {left: x, top: y, width: width, height: height},
        ]}
      />
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  character: {
    position: 'absolute',
  },
});

export default Character;
