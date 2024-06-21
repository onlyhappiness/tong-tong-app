import {screenWidth} from '../constants/screenSize';

const MoveCharacterSystem = (entities, {time}) => {
  const speed = 0.05;
  const position = entities.character.body.position;
  const character = entities.character;

  // 일정 시간마다 상태를 변경하도록 설정
  if (!character.nextChangeTime || time.current > character.nextChangeTime) {
    // 3초 후 상태 변경
    character.nextChangeTime = time.current + 3000;

    // 0: 멈춤,
    // 1: 왼쪽,
    // 2: 오른쪽
    character.state = Math.floor(Math.random() * 3);
  }

  // 화면의 왼쪽 끝 또는 오른쪽 끝에 도달하면 상태를 멈춤으로 변경
  if (character.state === 1) {
    // 왼쪽으로 이동
    position.x -= speed * time.delta;

    // 왼쪽 끝에 마주하면 방향을 오른쪽으로 변경
    if (position.x + 50 < screenWidth / screenWidth + 100) {
      // 왼쪽으로 이동
      character.state = 2;
    }
  } else if (character.state === 2) {
    // 오른쪽으로 이동
    position.x += speed + time.delta;

    // 오른쪽 끝에 마주하면 방향을 왼쪽으로 변경
    if (screenWidth < position.x + 50) {
      character.state = 1;
    }
  }

  return entities;
};

export default MoveCharacterSystem;
