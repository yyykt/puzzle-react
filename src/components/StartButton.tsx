import React, { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  box-sizing: border-box;
  background: #fff;
  min-height: 40px;
  width: 100%;
  cursor: pointer;
`;

interface Props {
  callback?: any;
}
const StartButton: FC<Props> = ({ callback }) => (
  <Wrapper onClick={callback}>Start Game</Wrapper>
);

export default StartButton;
