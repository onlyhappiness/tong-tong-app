const characterTypes: any = {
  egg: {
    idleImages: [],
    leftImages: [],
    rightImages: [],
  },
  chick: {
    size: 70,
    idleImages: [
      require('../assets/chick/idle-1.png'),
      require('../assets/chick/idle-2.png'),
    ],
    leftImages: [
      require('../assets/chick/left-1.png'),
      require('../assets/chick/left-2.png'),
    ],
    rightImages: [
      require('../assets/chick/right-1.png'),
      require('../assets/chick/right-2.png'),
    ],
  },
};

export default characterTypes;
