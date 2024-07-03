import {screenHeight} from '@/constants/screenSize';
import React, {ReactNode} from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

interface ButtonProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined';
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
}

export default ({
  label,
  variant = 'filled',
  containerStyle = null,
  textStyle = null,
  icon = null,
  ...props
}: ButtonProps) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        containerStyle,
      ]}>
      <View style={styles.button}>
        <Text>{label}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  filled: {
    backgroundColor: 'gray',
    borderRadius: 30,
  },
  outlined: {
    borderColor: '',
    borderWidth: 1,
  },
  filledPressed: {
    backgroundColor: 'white',
    borderRadius: 30,
  },
  outlinedPressed: {
    borderColor: '',
    borderWidth: 1,
    opacity: 0.5,
  },
  button: {
    width: '100%',
    paddingHorizontal: screenHeight > 700 ? 10 : 8,
    height: 50,
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});
