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
        <View style={[styles.container]}>
          <View style={Boolean(icon) && styles.innerContainer}>
            {icon}
            <TextInput
              ref={ref ? mergeRefs(innerRef, ref) : innerRef}
              style={styles.input}
              autoCapitalize="none"
              spellCheck={false}
              autoCorrect={false}
              // placeholderTextColor={'#333333'}
              {...props}
            />
          </View>
        </View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.2,
    borderColor: '#e2e8f0',
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
});

export default InputField;
