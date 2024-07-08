import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface Props {
  className?: StyleProp<ViewStyle>;
  children: ReactNode;
}

export default ({className, children}: Props) => {
  return <View style={[styles.container, className]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
  },
});
