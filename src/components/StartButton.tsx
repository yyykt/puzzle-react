import React, { FC } from 'react';
import styled from 'styled-components';

interface Props {
  callback?: any;
}
const StartButton: FC<Props> = ({ callback }) => (
  <Button onClick={callback}>Start Game</Button>
);

const Button = styled.button`
  box-sizing: border-box;
  background: #fff;
  min-height: 40px;
  width: 100%;
  cursor: pointer;
`;

export default StartButton;
