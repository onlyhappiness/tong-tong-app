import {windowWidth} from '../constants/screenSize';

const MoveCharacterSystem = (entities: any, {time}: any) => {
  const speed = 0.05; // 속도 값을 조절하여 이동 속도 변경
  const character = entities?.character;

  // console.log('entities:: ', entities);

  if (!character) {
    return entities;
  }

  if (entities.status === 'stop') {
    character.state = 0;
  }

  // 캐릭터가 알이면 움직이지 않기
  if (entities.character?.type === 'egg') {
    character.state = 0;
  }

  // 일정 시간마다 상태를 변경하도록 설정
  if (!character?.nextChangeTime || time.current > character?.nextChangeTime) {
    // 3초 후 상태 변경
    character.nextChangeTime = time.current + 3000;

    // 0: 멈춤, 1: 왼쪽, 2: 오른쪽
    character.state = Math.floor(Math.random() * 3);
  }

  // 애니메이션 프레임 변경 (0.2초마다 변경)
  if (
    !character.nextFrameChangeTime ||
    time.current > character.nextFrameChangeTime
  ) {
    character.nextFrameChangeTime = time.current + 200;

    if (character.state === 1) {
      // 왼쪽으로 이동하는 애니메이션
      character.imageIndex =
        (character.imageIndex + 1) % character.leftImages.length;
      character.image = character.leftImages[character.imageIndex];
    } else if (character.state === 2) {
      // 오른쪽으로 이동하는 애니메이션
      character.imageIndex =
        (character.imageIndex + 1) % character.rightImages.length;
      character.image = character.rightImages[character.imageIndex];
    } else {
      // 멈춤 상태의 애니메이션
      character.nextFrameChangeTime = time.current + 600;

      character.imageIndex =
        (character.imageIndex + 1) % character.idleImages.length;
      character.image = character.idleImages[character.imageIndex];
    }
  }

  // 화면의 왼쪽 끝 또는 오른쪽 끝에 도달하면 상태를 멈춤으로 변경
  if (character.position[0] - character.size[0] / 2 <= 0) {
    character.state = 2; // 오른쪽으로 이동
  } else if (character.position[0] + character.size[0] / 2 >= windowWidth) {
    character.state = 1; // 왼쪽으로 이동
  }

  // 캐릭터 이동
  if (character.state === 1) {
    character.position[0] -= speed * time.delta;
  } else if (character.state === 2) {
    character.position[0] += speed * time.delta;
  }

  return entities;
};

export default MoveCharacterSystem;
