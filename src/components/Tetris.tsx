import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { createEmptyFiled, calcVisibleStage } from 'gameHelper';
import bgImage from 'img/bg.jpg';

import useMino from 'hooks/useMino';
import useStage from 'hooks/useStage';

import { dirname } from 'path';
import { create } from 'domain';
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

  const gameOver = false;
  const { mino, updateMinoPos, resetMino } = useMino();
  const field = createEmptyFiled();

  const shiftMino = (dir: 1 | -1) => {
    updateMinoPos({ dx: dir, dy: 0 });
  };

  const dropMino = () => {
    updateMinoPos({ dx: 0, dy: -1 });
  };

  const startGame = () => {
    // Reset everything
    resetMino();
  };

  const move = ({ keyCode }: { keyCode: number }) => {
    if (keyCode === KeyMap.shiftLeft) {
      shiftMino(-1);
    } else if (keyCode === KeyMap.shiftRight) {
      shiftMino(1);
    } else if (keyCode === KeyMap.softDrop) {
      dropMino();
    }
  };

  return (
    <div tabIndex={0} role="button" onKeyDown={(e) => move(e)}>
      <Wrapper>
        <Stage stage={calcVisibleStage(field, mino)} />
        <aside>
          {gameOver ? (
            <Display text="Game Over" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton callback={startGame} />
          <ConstComponent />
        </aside>
      </Wrapper>
    </div>
  );
};

const ConstComponent: FC = () => <div>hogehoge</div>;

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
  max-width: 900px;

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;

export default Tetris;
