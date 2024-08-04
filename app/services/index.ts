import {useUserInfoActions} from '@/data/userStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import Config from 'react-native-config';

export const getApiHost = () => {
  // return Config.API_URL;
  return 'http://localhost:3030';
};

const api = axios.create({
  baseURL: getApiHost(),
  withCredentials: true,
});

api.interceptors.request.use(async (config: any) => {
  const token = await AsyncStorage.getItem('token');
  console.log('token:: ', token);

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const {clearUserInfo} = useUserInfoActions();
    const {
      config,
      response: {status},
    } = error;

    console.log({error, config, status});

    if (status === 401) {
      console.log('토큰 제거 해야함');
      await AsyncStorage.removeItem('token');
      clearUserInfo();
    }

    return Promise.reject(error);
  },
);

export default api;
