import React from 'react';
import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IMainLayout {
  children: React.ReactNode;
  className?: StyleProp<ViewStyle>;
  extraChildren?: React.ReactNode;
}
export default ({children, extraChildren, className}: IMainLayout) => {
  const {top} = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.layout, className]}>
      <View style={[styles.container, {paddingTop: top}]}>{children}</View>
      {extraChildren}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    // backgroundColor: '#7F7FD5',
  },
  container: {
    flex: 1,
  },
});
