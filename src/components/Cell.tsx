import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import MINOINFO, { MinoType } from 'tetriminos';

export interface Props {
  type:
    | 'empty'
    | 'activeMino'
    | 'fixedBlock'
    | 'ghost'
    | 'previewBg'
    | 'preview';
  minoType?: MinoType;
  cutoff?: boolean;
}

const Cell: FC<Props> = ({ type, minoType, cutoff }) => {
  return (
    <OuterBox cutoff={cutoff}>
      <InnerBox type={type} minoType={minoType} cutoff={cutoff} />
    </OuterBox>
  );
};

type x = Pick<Props, 'cutoff'>;

const OuterBox = styled.div<Pick<Props, 'cutoff'>>`
  position: relative;

  &::before {
    display: block;
    padding: ${(props) => (props.cutoff ? '20% 0' : '50% 0')};
    content: '';
  }
`;

const InnerBox = styled.div<Props>`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  ${(props) => {
    if (
      (props.type === 'fixedBlock' || props.type === 'activeMino') &&
      props.minoType
    ) {
      const { color } = MINOINFO[props.minoType];
      return css`
        background: rgba(${color}, 0.8);
        border: 6px outset;
        border-color: rgba(${color}, 0.8);
      `;
    }
    if (props.type === 'ghost' && props.minoType) {
      const { color } = MINOINFO[props.minoType];
      return css`
        background: rgba(${color}, 0.2);
        border: 6px outset;
        border-color: rgba(${color}, 0.2);
      `;
    }
    if (props.type === 'preview' && props.minoType) {
      const { color } = MINOINFO[props.minoType];
      return css`
        background: rgba(${color}, 0.8);
        border: 2px outset;
        border-color: rgba(${color}, 0.8);
      `;
    }
    if (props.type === 'previewBg') {
      return css``;
    }

    // interpret as 'empty'
    return css`
      border: 1px inset #777;
    `;
  }};
`;
export default Cell;
