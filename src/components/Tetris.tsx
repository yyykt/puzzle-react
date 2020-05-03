import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { createStage } from 'gameHelper';
import bgImage from 'img/bg.jpg';

import usePlayer from 'hooks/usePlayer';
import useStage from 'hooks/useStage';

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris: FC = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player] = usePlayer();
  const [stage, setStage] = useStage();

  const movePlayer = (dir: 'left' | 'right') => {};

  const drop = () => {};

  const dropPlayer = () => {};

  return (
    <Wrapper>
      <Stage stage={createStage()} />
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
        <StartButton />
      </aside>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
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
