import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export function PrimaryButton({ label, onPress, loading, disabled }: PrimaryButtonProps) {
  const theme = useTheme();
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? theme.tintPressed : theme.tint,
          boxShadow: isDisabled ? 'none' : `0 6px 16px ${theme.tintShadow}`,
          opacity: isDisabled ? 0.5 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      {loading && <ActivityIndicator color="#ffffff" />}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    borderRadius: 16,
    borderCurve: 'continuous',
    paddingVertical: Spacing.three,
  },
  label: {
    color: '#ffffff',
    fontFamily: Fonts?.rounded,
    fontSize: 17,
    fontWeight: '700',
  },
});
