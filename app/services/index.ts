import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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

  // console.log('token:::: ', token);

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default api;
