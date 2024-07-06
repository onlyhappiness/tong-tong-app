import AsyncStorage from '@react-native-async-storage/async-storage';

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

export {getStorage, removeStorage, setStorage};
