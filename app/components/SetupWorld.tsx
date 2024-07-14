import {windowWidth} from '@/constants/screenSize';
import characterTypes from '@/utils/characterType';
import Character from './Character';

const SetupWorld = (characterType: string) => {
  // const {character} = useGameState();

  const selectedCharacter = characterTypes[characterType];

  return {
    character: {
      type: characterType,
      position: [windowWidth / 2, 200],
      size: [selectedCharacter.size, selectedCharacter.size],
      state: 0,
      imageIndex: 0,
      leftImages: selectedCharacter.leftImages,
      rightImages: selectedCharacter.rightImages,
      // 멈춤 상태의 이미지
      idleImages: selectedCharacter.idleImages,
      image: selectedCharacter.idleImages[0], // 초기 이미지를 멈춤 상태 이미지로 설정
      renderer: Character,

      // 캐릭터 이벤트
      onPress: () => {},
    },
  };
};

export default SetupWorld;
