import { Image } from 'expo-image';
import { type ReactNode } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type AuthScaffoldProps = {
  /** Mascot emoji shown over the brand glow. */
  mascot?: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthScaffold({ mascot = '🐣', subtitle, children }: AuthScaffoldProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={process.env.EXPO_OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[
            styles.content,
            {
              paddingTop: insets.top + Spacing.six,
              paddingBottom: insets.bottom + Spacing.five,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <View style={styles.mascotWrap}>
              <Image
                source={require('@/assets/images/logo-glow.png')}
                style={StyleSheet.absoluteFill}
                contentFit="contain"
              />
              <Text style={styles.mascot}>{mascot}</Text>
            </View>
            <View style={styles.headings}>
              <Text style={[styles.wordmark, { color: theme.text }]}>통통</Text>
              <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{subtitle}</Text>
            </View>
          </View>

          <View style={styles.form}>{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    gap: Spacing.five,
  },
  hero: {
    alignItems: 'center',
    gap: Spacing.three,
  },
  mascotWrap: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascot: {
    fontSize: 80,
  },
  headings: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  wordmark: {
    fontFamily: Fonts?.rounded,
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
  },
  form: {
    gap: Spacing.three,
  },
});
