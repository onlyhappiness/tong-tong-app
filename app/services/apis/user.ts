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
  return data.data;
};

// 포인트 조회
const getUserPoint = async () => {
  const {data} = await api.get('/user/point');
  return data.data;
};

// 유저 닉네임 중복 확인
const checkDuplicatedNickname = async (nickname: string) => {
  const {data} = await api.post('/user/check-duplicated-nickname', null, {
    params: {nickname: nickname},
  });
  return data;
};

// 유저 이메일 중복 확인
const checkDuplicatedEmail = async (email: string) => {
  const {data} = await api.post('/user/check-duplicated-email', null, {
    params: {email: email},
  });
  console.log('이메일 중복 체크:::: ', data, email);
  return data;
};

// 유저 계정 중복 확인
const checkDuplicatedAccount = async (account: string) => {
  const {data} = await api.post('/user/check-duplicated-account', null, {
    params: {account: account},
  });
  return data;
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
  checkDuplicatedAccount,
  checkDuplicatedEmail,
  checkDuplicatedNickname,
  getUserFarm,
  getUserPetList,
  getUserPoint,
  postUserFarmSetting,
  postUserPetBuy,
};
