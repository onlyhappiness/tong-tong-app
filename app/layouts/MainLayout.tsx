import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IMainLayout {
  children: React.ReactNode;
  extraChildren?: React.ReactNode;
}
export default ({children, extraChildren}: IMainLayout) => {
  const {top, bottom} = useSafeAreaInsets();

  return (
    <View style={styles.layout}>
      <View style={[styles.container, {paddingTop: top, bottom: bottom}]}>
        {children}
      </View>
      {extraChildren}
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
});
