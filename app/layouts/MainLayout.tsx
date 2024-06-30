import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IMainLayout {
  children: React.ReactNode;
  extraChildren?: React.ReactNode;
}
export default ({children, extraChildren}: IMainLayout) => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={styles.layout}>
      <View style={[styles.container, {paddingTop: top}]}>{children}</View>
      {extraChildren}
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: '#7F7FD5',
  },
  container: {
    flex: 1,
  },
});
