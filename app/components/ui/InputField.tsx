import {COLOR} from '@/constants/color';
import {screenHeight} from '@/constants/screenSize';
import {mergeRefs} from '@/utils/func';
import React, {ForwardedRef, ReactNode, forwardRef, useRef} from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import Text from './Text';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  icon?: ReactNode;
}

const InputField = forwardRef(
  (
    {disabled = false, error, touched, icon = null, ...props}: InputFieldProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    const innerRef = useRef<TextInput | null>(null);

    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <Pressable onPress={handlePressInput} style={{width: '100%'}}>
        <View
          style={[
            styles.container,
            touched && Boolean(error) && styles.inputError,
          ]}>
          <View style={Boolean(icon) && styles.innerContainer}>
            {icon}
            <TextInput
              ref={ref ? mergeRefs(innerRef, ref) : innerRef}
              style={styles.input}
              autoCapitalize="none"
              spellCheck={false}
              autoCorrect={false}
              {...props}
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
    borderWidth: 1.2,
    borderColor: COLOR.border,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: screenHeight > 700 ? 10 : 8,
    // paddingVertical: screenHeight > 700 ? 6 : 4,
    borderRadius: 30,
    height: 50,
  },
  innerContainer: {
    flexDirection: 'row',
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  inputError: {
    borderWidth: 1,
    borderColor: 'red',
  },
  error: {
    color: 'red',
    paddingTop: 5,
  },
});

export default InputField;
