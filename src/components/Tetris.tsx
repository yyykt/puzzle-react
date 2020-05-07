import React, { FC } from 'react';
import styled from 'styled-components';
import useGame from 'hooks/useGame';
import useInterval from 'use-interval';

import { calcVisibleStage } from 'gameHelper';
import bgImage from 'img/bg.jpg';

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

type Command =
  | 'shiftRight'
  | 'shiftLeft'
  | 'rotateRight'
  | 'rotateLeft'
  | 'softDrop'
  | 'hardDrop'
  | 'hold'
  | 'pause';

const KeyMap: { [P in Command]: number } = {
  shiftRight: 39, // →
  shiftLeft: 37, // ←
  rotateRight: 88, // X
  rotateLeft: 90, // Z
  softDrop: 40, // ↓
  hardDrop: 32, // Space
  hold: 67, // C
  pause: 27, // Esc
};

const Tetris: FC = () => {
  // const [dropTime, setDropTime] = useState(null);
  // const [gameOver, setGameOver] = useState(false);

  const {
    game,
    startGame,
    shiftMino,
    dropMino,
    rotateMino,
    hardDropMino,
    timer,
    setTimer,
    next,
  } = useGame();

  const { mino, field, gameOver, lineCleared } = game;

  const move = ({ keyCode }: { keyCode: number }) => {
    if (keyCode === KeyMap.shiftLeft) {
      shiftMino(-1);
    } else if (keyCode === KeyMap.shiftRight) {
      shiftMino(1);
    } else if (keyCode === KeyMap.softDrop) {
      dropMino();
    } else if (keyCode === KeyMap.rotateLeft) {
      rotateMino('L');
    } else if (keyCode === KeyMap.rotateRight) {
      rotateMino('R');
    } else if (keyCode === KeyMap.hardDrop) {
      hardDropMino();
    }
  };

  useInterval(() => dropMino(), 1000);
  useInterval(() => setTimer(timer + 1), 1000);

  return (
    <div
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        e.preventDefault();
        move(e);
      }}
    >
      <Wrapper>
        <Stage stage={calcVisibleStage(field, mino)} />
        <aside>
          {gameOver ? (
            <Display text="Game Over" />
          ) : (
            <div>
              <Display text={`Time: ${timer}`} />
              <Display text={`Lines: ${lineCleared}`} />
              <Display
                text={`LPM: ${
                  timer && ((lineCleared / timer) * 60).toFixed(3)
                }`}
              />
              <Display text={`Next: ${next.join()}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  /* width: 100%; */
  /* height: 100%; */
  background: url(${bgImage});
  background-size: cover;
  overflow: hidden;

  display: flex;
  align-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 600px;

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;

export default Tetris;
