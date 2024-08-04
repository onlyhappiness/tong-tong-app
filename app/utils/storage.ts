import api from '@/services';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API header bearer token 설정
function setHeader(key: string, value: string) {
  api.defaults.headers.common[key] = value;
}

// API header bearer token 삭제
function removeHeader(key: string) {
  if (!api.defaults.headers.common[key]) {
    return;
  }

  delete api.defaults.headers.common[key];
}

const getStorage = async (key: string) => {
  const storedData = await AsyncStorage.getItem(key);

  return storedData;
};

const setStorage = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};

const removeStorage = async (key: string) => {
  const data = await getStorage(key);
  if (data) {
    await AsyncStorage.removeItem(key);
  }
};

export {getStorage, removeHeader, removeStorage, setHeader, setStorage};
