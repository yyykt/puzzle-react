import React, { FC } from 'react';

interface Props {
  callback?: any;
}
const StartButton: FC<Props> = ({ callback }) => <div>Start Game</div>;

export default StartButton;
