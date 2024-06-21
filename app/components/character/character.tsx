import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../constants/screenSize';

const Character = React.memo((props: any) => {
  const width = props.size[0];
  const height = props.size[1];
  const x = screenWidth / 2;
  const y = screenHeight / 2;

  return (
    <Image
      source={props.image}
      style={[
        styles.character,
        {left: x, top: y, width: width, height: height},
      ]}
    />
  );
});

const styles = StyleSheet.create({
  character: {
    position: 'absolute',
  },
});

export default Character;
