export interface LoginType {
  method: 'email' | 'kakao';
}

export interface userData {
  id: string;
  createdAt: string;
  updatedAt: string;
  method: 'email' | 'kakao';
  email: string;
  nickname: string;
  username: string;
  profileUrl: null | string;
}

export interface userRegisterRequest {
  method: string;
  email: string;
  nickname: string;
  username: string;
  password: string;
}

export interface userLoginFormData {
  email: string;
  password: string;
}

export interface userLoginRequest {
  method: 'email';
  email: string;
  password: string;
}

export interface userPetListData {
  id: string;
  createAt: string;
  updatedAt: string;
  name: string | null;
  type: string;
  intimacy: number;
  nature: string;
  species: string;
  exp: number;
}
