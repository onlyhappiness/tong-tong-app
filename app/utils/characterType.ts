const characterTypes: any = {
  egg: {
    size: 100,
    idleImages: [require('../assets/egg.png')],
    leftImages: [require('../assets/egg.png')],
    rightImages: [require('../assets/egg.png')],
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
  poodle: {
    size: 80,
    idleImages: [require('../assets/poodle/idle-1.png')],
    leftImages: [
      require('../assets/poodle/left-1.png'),
      require('../assets/poodle/left-2.png'),
    ],
    rightImages: [
      require('../assets/poodle/right-1.png'),
      require('../assets/poodle/right-2.png'),
    ],
  },
};

export default characterTypes;
