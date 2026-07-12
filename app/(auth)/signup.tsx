import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TextField } from '@/components/text-field';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ApiError } from '@/api/client';
import { useAuthStore } from '@/stores/auth-store';

export default function SignupScreen() {
  const theme = useTheme();
  const signup = useAuthStore((s) => s.signup);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    setEmailError(null);
    setFormError(null);

    if (password.length < 8) {
      setFormError('비밀번호는 8자 이상이어야 해요.');
      return;
    }

    setSubmitting(true);
    try {
      await signup(email, password);
    } catch (e) {
      if (e instanceof ApiError && e.code === 409) {
        setEmailError(e.message);
      } else {
        setFormError(e instanceof ApiError ? e.message : '연결 실패, 다시 시도해주세요.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={[styles.title, { color: theme.text }]}>회원가입</Text>

        {formError && <Text style={styles.error}>{formError}</Text>}

        <TextField
          placeholder="이메일"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {emailError && <Text style={styles.error}>{emailError}</Text>}

        <TextField
          placeholder="비밀번호 (8자 이상)"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable style={styles.button} onPress={handleSubmit} disabled={submitting}>
          <Text style={styles.buttonText}>{submitting ? '가입 중...' : '회원가입'}</Text>
        </Pressable>

        <Link href="/login">
          <Text style={styles.link}>이미 계정이 있나요? 로그인</Text>
        </Link>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.four,
  },
  error: {
    color: '#e5484d',
    textAlign: 'center',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#3c87f7',
    borderRadius: Spacing.two,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  link: {
    color: '#3c87f7',
    fontSize: 14,
    textAlign: 'center',
  },
});
