import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function TextField({ style, ...rest }: TextInputProps) {
  const theme = useTheme();

  return (
    <TextInput
      style={[
        styles.input,
        { color: theme.text, backgroundColor: theme.backgroundElement },
        style,
      ]}
      placeholderTextColor={theme.textSecondary}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 16,
  },
});
