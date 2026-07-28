import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

import { ApiError } from "@/api/client";
import { AuthScaffold } from "@/components/auth/auth-scaffold";
import { FormTextField } from "@/components/auth/form-text-field";
import { PrimaryButton } from "@/components/primary-button";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { loginSchema, type LoginForm } from "@/schema/auth";
import { useAuthStore } from "@/stores/auth-store";

export default function LoginScreen() {
  const theme = useTheme();
  const login = useAuthStore((s) => s.login);
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      await login(email, password);
    } catch (e) {
      setError("root", {
        message:
          e instanceof ApiError ? e.message : "연결 실패, 다시 시도해주세요.",
      });
    }
  });

  const topError =
    errors.email?.message ?? errors.password?.message ?? errors.root?.message;

  return (
    <AuthScaffold mascot="🐣" subtitle="다시 만나서 반가워요 👋">
      {topError && (
        <Text selectable style={[styles.error, { color: theme.danger }]}>
          {topError}
        </Text>
      )}

      <FormTextField
        control={control}
        name="email"
        icon="envelope.fill"
        placeholder="이메일"
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        hasError={!!errors.root}
      />
      <FormTextField
        control={control}
        name="password"
        icon="lock.fill"
        placeholder="비밀번호"
        secureTextEntry
        autoComplete="current-password"
        hasError={!!errors.root}
      />

      <PrimaryButton
        label={isSubmitting ? "로그인 중..." : "로그인"}
        onPress={onSubmit}
        loading={isSubmitting}
      />

      <Link href="/signup" style={styles.linkWrap}>
        <View style={styles.linkRow}>
          <Text style={[styles.linkMuted, { color: theme.textSecondary }]}>
            계정이 없나요?{" "}
          </Text>
          <Text style={[styles.link, { color: theme.tint }]}>회원가입</Text>
        </View>
      </Link>
    </AuthScaffold>
  );
}

const styles = StyleSheet.create({
  error: {
    textAlign: "center",
    fontSize: 14,
  },
  linkWrap: {
    alignSelf: "center",
    paddingVertical: Spacing.two,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkMuted: {
    fontSize: 14,
  },
  link: {
    fontSize: 14,
    fontWeight: "600",
  },
});
