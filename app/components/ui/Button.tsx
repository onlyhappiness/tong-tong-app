import {BUTTON} from '@/constants/color';
import {screenHeight} from '@/constants/screenSize';
import React, {ReactNode} from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Text from './Text';

interface ButtonProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined';
  color?: 'primary' | 'secondary' | 'highlight';
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
  isLoading?: boolean;
}

export default ({
  label,
  variant = 'filled',
  color = 'primary',
  containerStyle = null,
  textStyle = null,
  icon = null,
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        pressed
          ? [styles[`${variant}Pressed`], styles[`${color}Pressed`]]
          : [styles[variant], styles[color]],
        containerStyle,
      ]}
      {...props}>
      <View style={styles.button}>
        {isLoading ? (
          <ActivityIndicator color={'#333onl'} />
        ) : (
          <>
            {icon}
            <Text
              variant="button"
              textStyle={[styles[`${variant}Text`], textStyle]}>
              {label}
            </Text>
          </>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 30,
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
  filled: {},
  filledPressed: {},
  filledText: {},

  outlined: {
    borderColor: '',
    borderWidth: 1,
  },
  outlinedPressed: {},
  outlinedText: {},

  // color
  primary: {
    backgroundColor: BUTTON.primary,
  },
  primaryPressed: {
    backgroundColor: BUTTON.primary_hover,
  },
  secondary: {
    backgroundColor: BUTTON.secondary,
  },
  secondaryPressed: {
    backgroundColor: BUTTON.secondary_hover,
  },
  highlight: {
    backgroundColor: BUTTON.highlight,
  },
  highlightPressed: {
    backgroundColor: BUTTON.highlight_hover,
  },
});
