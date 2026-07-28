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
import { signupSchema, type SignupForm } from "@/schema/auth";
import { useAuthStore } from "@/stores/auth-store";

export default function SignupScreen() {
  const theme = useTheme();
  const signup = useAuthStore((s) => s.signup);
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      await signup(email, password);
    } catch (e) {
      if (e instanceof ApiError && e.code === 409) {
        setError("email", { message: e.message });
      } else {
        setError("root", {
          message:
            e instanceof ApiError ? e.message : "연결 실패, 다시 시도해주세요.",
        });
      }
    }
  });

  const topError = errors.root?.message ?? errors.password?.message;

  return (
    <AuthScaffold mascot="🥚" subtitle="통통과 함께 시작해볼까요?">
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
      />
      {errors.email && (
        <Text selectable style={[styles.error, { color: theme.danger }]}>
          {errors.email.message}
        </Text>
      )}

      <FormTextField
        control={control}
        name="password"
        icon="lock.fill"
        placeholder="비밀번호 (8자 이상)"
        secureTextEntry
        autoComplete="new-password"
      />

      <PrimaryButton
        label={isSubmitting ? "가입 중..." : "회원가입"}
        onPress={onSubmit}
        loading={isSubmitting}
      />

      <Link href="/login" style={styles.linkWrap}>
        <View style={styles.linkRow}>
          <Text style={[styles.linkMuted, { color: theme.textSecondary }]}>
            이미 계정이 있나요?{" "}
          </Text>
          <Text style={[styles.link, { color: theme.tint }]}>로그인</Text>
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
