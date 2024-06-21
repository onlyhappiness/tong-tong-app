import Matter from 'matter-js';
import React, {useRef} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {GameEngine} from 'react-native-game-engine';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const Box = React.memo((props: any) => {
  const width = props.size[0];
  const height = props.size[1];
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  return (
    <View
      style={[styles.box, {left: x, top: y, width: width, height: height}]}
    />
  );
});

const MoveBoxSystem = (entities, {time}) => {
  const speed = 0.05; // 속도 값을 조절하여 이동 속도 변경
  const position = entities.box.body.position;
  const box = entities.box;

  // 일정 시간마다 상태를 변경하도록 설정
  if (!box.nextChangeTime || time.current > box.nextChangeTime) {
    // 3초 후 상태 변경
    box.nextChangeTime = time.current + 3000;

    // 0: 멈춤,
    // 1: 왼쪽,
    // 2: 오른쪽
    box.state = Math.floor(Math.random() * 3);
  }

  // 화면의 왼쪽 끝 또는 오른쪽 끝에 도달하면 상태를 멈춤으로 변경
  if (box.state === 1) {
    // 왼쪽으로 이동
    position.x -= speed * time.delta;

    // 왼쪽 끝에 마주하면 방향을 오른쪽으로 변경
    if (position.x + 25 < SCREEN_WIDTH / SCREEN_WIDTH + 50) {
      box.state = 2;
    }
  } else if (box.state === 2) {
    // 오른쪽으로 이동
    position.x += speed * time.delta;

    // 오른쪽 끝에 마주하면 방향을 왼쪽으로 변경
    if (SCREEN_WIDTH < position.x + 25) {
      box.state = 1;
    }
  }

  return entities;
};

const App = () => {
  // console.log('SCREEN_WIDTH::: ', SCREEN_WIDTH / SCREEN_WIDTH);

  const gameEngine = useRef(null);

  const setupWorld = () => {
    let engine = Matter.Engine.create({enableSleeping: false});
    let world = engine.world;

    let box = Matter.Bodies.rectangle(200, 200, 50, 50); // Box의 초기 위치 설정
    Matter.World.add(world, [box]);

    return {
      physics: {engine: engine, world: world},
      box: {
        body: box,
        size: [50, 50],
        color: 'red',
        renderer: Box,
      },
    };
  };

  const entities = setupWorld();

  return (
    <View style={styles.container}>
      <GameEngine
        ref={gameEngine}
        style={styles.container}
        systems={[MoveBoxSystem]}
        entities={entities}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  box: {
    position: 'absolute',
    backgroundColor: 'red',
  },
  character: {
    position: 'absolute',
  },
});

export default App;
