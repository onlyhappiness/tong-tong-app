import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface props {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  flex?: 0 | 1;
}

const Center = ({children, containerStyle, flex = 0}: props) => {
  return (
    <View style={[styles.center, styles[`flex${flex}`], containerStyle]}>
      {children}
    </View>
  );
};

const RowStack = ({children, containerStyle, flex = 0}: props) => {
  return (
    <View style={[styles.vstack, styles[`flex${flex}`], containerStyle]}>
      {children}
    </View>
  );
};

const ColStack = ({children, containerStyle, flex = 0}: props) => {
  return (
    <View style={[styles.hstack, styles[`flex${flex}`], containerStyle]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  flex0: {},
  flex1: {flex: 1},
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  vstack: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hstack: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export {Center, ColStack, RowStack};
