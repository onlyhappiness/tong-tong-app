import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Platform} from 'react-native';

export const getApiHost = () => {
  return Platform.OS === 'android'
    ? 'http://10.0.2.2:3030'
    : 'http://localhost:3030';
};

const api = axios.create({
  baseURL: getApiHost(),
  withCredentials: true,
});

console.log('api:: ', getApiHost());

api.interceptors.request.use(async (config: any) => {
  // const token = await getStorage('token');
  const token = await AsyncStorage.getItem('token');

  console.log('token:::: ', token);

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default api;
