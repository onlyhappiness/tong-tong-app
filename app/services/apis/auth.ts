import api from '..';

// 로그인 유저 확인
const getAuthLogin = async () => {
  const {data} = await api.get('/auth/login');
  return data;
};

// 회원가입
const postAuthRegister = async (req: any) => {
  const {data} = await api.post('/auth/register', req);
  return data;
};

// 로그인
const postAuthLogin = async (req: any) => {
  const {data} = await api.post('/auth/login', req);
  return data;
};

export {getAuthLogin, postAuthLogin, postAuthRegister};
