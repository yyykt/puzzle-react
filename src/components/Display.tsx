import React, { FC } from 'react';

interface Props {
  gameOver?: boolean;
  text: string;
}

const Display: FC<Props> = ({ gameOver, text }) => <div>{text}</div>;

export default Display;
