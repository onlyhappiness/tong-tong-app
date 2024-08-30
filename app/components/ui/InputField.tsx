import {COLOR} from '@/constants/color';
import {screenHeight} from '@/constants/screenSize';
import React, {ForwardedRef, ReactNode, forwardRef, useRef} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import Text from './Text';

interface InputFieldProps extends TextInputProps {
  variant?: 'border' | 'underscore';
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  icon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

const InputField = forwardRef(
  (
    {
      variant = 'border',
      disabled = false,
      error,
      touched,
      icon = null,
      containerStyle,
      ...props
    }: InputFieldProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    const innerRef = useRef<TextInput | null>(null);

    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <Pressable
        onPress={handlePressInput}
        style={[containerStyle, {width: '100%'}]}>
        <View
          style={[
            styles.container,
            styles[variant],
            touched && Boolean(error) && styles[`input${variant}Error`],
          ]}>
          <View style={Boolean(icon) && styles.innerContainer}>
            {icon}
            <TextInput
              // ref={ref ? mergeRefs(innerRef, ref) : innerRef}
              style={styles[`input${variant}`]}
              autoCapitalize="none"
              spellCheck={false}
              autoCorrect={false}
              {...props}
              placeholderTextColor={'#B1B8C0'}
            />
          </View>
        </View>
        {touched && Boolean(error) && (
          <Text variant="caption" textStyle={styles.error}>
            {error!}
          </Text>
        )}
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: screenHeight > 700 ? 10 : 8,
    height: 50,
  },
  innerContainer: {
    flexDirection: 'row',
  },
  border: {
    borderWidth: 1.2,
    borderColor: COLOR.border,
    borderRadius: 30,
  },
  inputborder: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  inputborderError: {
    borderWidth: 1,
    borderColor: 'red',
  },
  underscore: {
    borderBottomWidth: 1.5,
    borderColor: COLOR.border,
  },
  inputunderscore: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputunderscoreError: {
    borderWidth: 1,
    borderColor: 'red',
  },
  error: {
    color: 'red',
    paddingTop: 5,
  },
});

export default InputField;
