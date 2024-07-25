import {farmRequest} from '@/types/farm';
import {petBuyRequest} from '@/types/pet';
import api from '..';

// 내 농장 확인하기
const getUserFarm = async () => {
  const {data} = await api.get('/user/farm');
  return data.data;
};

// 내 펫 목록
const getUserPetList = async () => {
  const {data} = await api.get('/user/pet-list');
  return data;
};

// 포인트 조회
const getUserPoint = async () => {
  const {data} = await api.get('/user/point');
  console.log('data: ', data);
  return data.data;
};

// 농장 설정
const postUserFarmSetting = async (req: farmRequest) => {
  const {data} = await api.post('/user/farm-setting', req);
  return data;
};

// 펫 구입
const postUserPetBuy = async (req: petBuyRequest) => {
  const {data} = await api.post('/user/pet-buy', req);
  return data;
};

export {
  getUserFarm,
  getUserPetList,
  getUserPoint,
  postUserFarmSetting,
  postUserPetBuy,
};
