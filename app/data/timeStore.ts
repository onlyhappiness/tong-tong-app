// 시간에 대한 전역 상태
// 주기적으로 30분마다 시간이 변합니다.
// 아침, 오후, 저녁

import {create} from 'zustand';

interface State {
  gameTime: number;
  timeOfDay: string;
}

interface Actions {
  setGameTime: (time: number) => void;
  updateTimeOfDay: (gameTime: number) => void;
}

interface Store extends State, Actions {}

const useTimeStore = create<Store>(set => ({
  gameTime: 0,
  timeOfDay: 'Morning',

  setGameTime: (time: number) => set({gameTime: time}),
  updateTimeOfDay: (gameTime: number) => {
    let timeOfDay = 'Night';
    switch (true) {
      case gameTime >= 6 && gameTime < 12:
        timeOfDay = 'Morning';
        break;
      case gameTime >= 12 && gameTime < 18:
        timeOfDay = 'Afternoon';
        break;
      case gameTime >= 18 && gameTime < 24:
        timeOfDay = 'Evening';
        break;
      default:
        timeOfDay = 'Night';
    }
    set({timeOfDay});
  },
}));

export default useTimeStore;
