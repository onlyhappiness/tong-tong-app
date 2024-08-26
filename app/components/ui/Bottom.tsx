import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface Props {
  viewStyle?: StyleProp<ViewStyle>;
  children: ReactNode;
}

export default ({viewStyle, children}: Props) => {
  return <View style={[styles.container, viewStyle]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
  },
});
