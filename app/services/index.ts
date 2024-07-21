import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from 'react-native-config';

export const getApiHost = () => {
  return Config.API_URL;
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
