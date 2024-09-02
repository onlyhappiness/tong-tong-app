// 회원가입 form
export interface userRegisterFormData {
  email: string;
  account: string;
  nickname: string;
  username: string;
  password: string;
}

export interface userRegisterRequest {
  method: string;
  email: string;
  account: string;
  nickname: string;
  username: string;
  password: string;
}

// 로그인 form
export interface userLoginFormData {
  account: string;
  password: string;
}

export interface userLoginRequest {
  method: 'email';
  account: string;
  password: string;
}
