import React from 'react';
import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface IMainLayout {
  children: React.ReactNode;
  viewStyle?: StyleProp<ViewStyle>;
  extraChildren?: React.ReactNode;
}
export default ({children, extraChildren, viewStyle}: IMainLayout) => {
  // const {top} = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.layout, viewStyle]}>
      <View style={[styles.container]}>{children}</View>
      {extraChildren}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
