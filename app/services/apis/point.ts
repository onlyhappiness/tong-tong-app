import {pointFormRequest} from '@/types/point';
import api from '..';

// 포인트 사용
const patchPostPoint = async (req: pointFormRequest) => {
  const {data} = await api.patch('/point/use', req);
  return data;
};

// 포인트 충전
const patchChargePoint = async (req: pointFormRequest) => {
  const {data} = await api.patch('/point/charge', req);
  return data;
};

export {patchChargePoint, patchPostPoint};
