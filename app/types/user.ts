export interface userLoginFormData {
  email: string;
  password: string;
}

export interface userLoginRequest {
  method: 'email';
  email: string;
  password: string;
}
