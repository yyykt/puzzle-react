import React, { FC } from 'react';
import styled from 'styled-components';

const Display: FC<Props> = ({ gameOver, text }) => <Wrapper>{text}</Wrapper>;

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
  padding: 20px;
  border: 4px solid #333;
  border-radius: 20px;
  background: #fff;
  width: 100%;
  font-size: 0.8em;
`;
interface Props {
  gameOver?: boolean;
  text: string;
}

export default Display;
