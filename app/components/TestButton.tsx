import {useCharacterActions} from '@/data/characterStore';
import {useGameState} from '@/data/gameStore';
import {setPetStatus} from '@/utils/petStatus';
import Button from './ui/Button';

export default () => {
  const gameRef = useGameState();
  const {setCharacter} = useCharacterActions();

  const test = async () => {
    // clearUserInfo();
    setCharacter('chick');
    setPetStatus(gameRef, 'start');
  };

  return <Button label="테스트" onPress={test} />;
};
