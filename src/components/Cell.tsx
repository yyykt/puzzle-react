import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import TETROMINO, { MinoType } from 'tetrominos';

type CellType = 'empty' | 'block' | 'ghost';
interface Props {
  type?: CellType;
  mino?: MinoType;
}

const Wrapper = styled.div<{ type: CellType; color: string }>`
  &::before {
    display: block;
    padding-top: 100%;
    content: '';
  }

  ${(props) => {
    if (props.type === 'block') {
      return css`
        background: rgba(${props.color}, 0.8);
        border: 4px solid;
        border-bottom-color: rgba(${props.color}, 0.1);
        border-right-color: rgba(${props.color}, 1);
        border-top-color: rgba(${props.color}, 1);
        border-left-color: rgba(${props.color}, 0.3);
      `;
    }
    if (props.type === 'empty') {
      return css`
        border: 1px solid;
        border-color: #555;
      `;
    }
    return '';
  }};
`;

const Cell: FC<Props> = ({ type = 'empty', mino }) => {
  const colorEmpty: string = 'rgba(0, 0, 0, 0.0)';
  const color = mino ? TETROMINO[mino].color : colorEmpty;
  return <Wrapper type={type} color={color} />;
};
export default Cell;
