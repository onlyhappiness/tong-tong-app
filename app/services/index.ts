import {getEncryptStorage} from '@/utils/storage';
import axios from 'axios';

export const getApiHost = () => {
  return 'http://localhost:3030';
};

const api = axios.create({
  baseURL: getApiHost(),
  withCredentials: true,
});

api.interceptors.request.use(async config => {
  const token = await getEncryptStorage('access-token');

  console.log('token::: ', token);

  return config;
});

export default api;
