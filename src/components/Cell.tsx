import React, { FC, memo } from 'react';
import styled, { css } from 'styled-components';
import MINOINFO, { MinoType } from 'tetrominos';

type CellType = 'empty' | 'block' | 'ghost';
export interface Props {
  type: 'empty' | 'activeMino' | 'fixedBlock' | 'ghost';
  minoType?: MinoType;
  cutoff?: boolean;
}

// TODO rename
const Cell: FC<Props> = (props) => {
  return <Wrapper {...props} />;
};

const Wrapper = styled.div<Props>`
  &::before {
    display: block;
    padding-top: ${(props) => (props.cutoff ? '30%' : '100%')};
    content: '';
  }

  ${(props) => {
    if (
      (props.type === 'fixedBlock' || props.type === 'activeMino') &&
      props.minoType
    ) {
      const { color } = MINOINFO[props.minoType];
      return css`
        background: rgba(${color}, 0.7);
        border: 6px outset;
        border-color: rgba(${color}, 0.8);
        /* border-bottom-color: rgba(${color}, 0.1);
        border-right-color: rgba(${color}, 1);
        border-top-color: rgba(${color}, 1);
        border-left-color: rgba(${color}, 0.3); */
      `;
    }
    if (props.type === 'ghost' && props.minoType) {
      const { color } = MINOINFO[props.minoType];

      return css`
        background: white;
        border: 4px solid;
        border-color: gray;
      `;
    }

    // interpret as 'empty'
    return css`
      border: 1px inset;
      border-color: #bbb;
    `;
  }};
  ${(props) => (props.cutoff ? 'border-top: 0px' : '')}
`;
export default memo(Cell);
