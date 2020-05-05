import React, { FC } from 'react';
import styled from 'styled-components';

import Cell, { Props as CellProps } from 'components/Cell';

export interface Props {
  stage: CellProps[][];
}

const Stage: FC<Props> = ({ stage }) => {
  const width = stage[0].length;
  const height = stage.length;
  return (
    <Wrapper width={width} height={height}>
      {stage
        .reverse()
        .map((row, y) =>
          row.map((props, x) => (
            <Cell {...props} cutoff={y === 0} key={`${x}_${y}`} />
          ))
        )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ width: number; height: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-gap: 1px;
  border: 4px solid #fff;
  width: 100%;
  background: #557;
`;

export default Stage;
