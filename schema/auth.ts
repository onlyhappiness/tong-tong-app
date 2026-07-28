import { z } from 'zod';

/** 로그인 폼 검증 스키마: 이메일 형식과 비밀번호 입력 여부만 확인한다. */
export const loginSchema = z.object({
  email: z.email({ error: '올바른 이메일 형식이 아니에요.' }),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});
export type LoginForm = z.infer<typeof loginSchema>;

/** 회원가입 폼 검증 스키마: 비밀번호는 8자 이상이어야 한다. */
export const signupSchema = z.object({
  email: z.email({ error: '올바른 이메일 형식이 아니에요.' }),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 해요.'),
});
export type SignupForm = z.infer<typeof signupSchema>;
