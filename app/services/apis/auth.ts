import {userLoginRequest, userRegisterRequest} from '@/types/auth';
import api from '..';

// 로그인 유저 확인
const getAuthLogin = async () => {
  try {
    const {data} = await api.get('/auth/login');
    return data.data;
  } catch (error) {
    // console.error('Error fetching auth login:', error);
    throw error;
  }
};

// 회원가입
const postAuthRegister = async (req: userRegisterRequest) => {
  const {data} = await api.post('/auth/register', req);
  return data;
};

// 로그인
const postAuthLogin = async (req: userLoginRequest) => {
  const {data} = await api.post('/auth/login', req);
  return data.data;
};

export {getAuthLogin, postAuthLogin, postAuthRegister};
