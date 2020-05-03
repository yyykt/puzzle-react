import React from 'react';
import styled from 'styled-components';

import { createStage } from 'gameHelper';
import bgImage from 'img/bg.jpg';

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

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

const Tetris = () => {
  return (
    <Wrapper>
      <Stage stage={createStage()} />
      <aside>
        <div>
          <Display text="Score" />
          <Display text="Rows" />
          <Display text="Level" />
        </div>
        <StartButton />
      </aside>
    </Wrapper>
  );
};

export default Tetris;
