import {useCharacterActions} from '@/data/characterStore';
import {useGameState} from '@/data/gameStore';
import {useUserInfoActions} from '@/data/userStore';
import Button from './ui/Button';

export default () => {
  const gameRef = useGameState();
  const {setCharacter} = useCharacterActions();

  const {clearUserInfo} = useUserInfoActions();

  const test = async () => {
    // clearUserInfo();
    // setCharacter('egg');
    // setPetStatus(gameRef, 'start');
    clearUserInfo();
  };

  return <Button label="테스트" onPress={test} />;
};
