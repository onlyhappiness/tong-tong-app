import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type TextFieldProps = TextInputProps & {
  /** SF Symbol name shown as a leading icon (iOS only). */
  icon?: string;
  /** Highlights the field border in the danger color. */
  error?: boolean;
};

export function TextField({ style, icon, error, onFocus, onBlur, ...rest }: TextFieldProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error ? theme.danger : focused ? theme.tint : 'transparent';
  const iconColor = error ? theme.danger : focused ? theme.tint : theme.textSecondary;

  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: theme.backgroundElement, borderColor },
      ]}
    >
      {icon && process.env.EXPO_OS === 'ios' && (
        <Image
          source={`sf:${icon}`}
          tintColor={iconColor as string}
          style={styles.icon}
        />
      )}
      <TextInput
        style={[styles.input, { color: theme.text }, style]}
        placeholderTextColor={theme.textSecondary}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    borderRadius: 14,
    borderCurve: 'continuous',
    borderWidth: 1.5,
    paddingHorizontal: Spacing.three,
  },
  icon: {
    width: 20,
    height: 20,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.three,
    fontSize: 16,
  },
});
