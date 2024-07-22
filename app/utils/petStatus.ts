import {GameEngine} from 'react-native-game-engine';

// 펫 상태 변경
const setPetStatus = (gameRef: GameEngine | any, state: string) => {
  const {gameEngineRef} = gameRef;

  if (gameEngineRef) {
    const currentEntities = gameEngineRef.props;
    const entities = currentEntities.entities;
    entities.status = state;
  }
};

export {setPetStatus};
