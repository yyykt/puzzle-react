import React, { FC } from 'react';
import styled from 'styled-components';

import Cell from 'components/Cell';
import { CellData } from 'gameHelper';

interface Props {
  stage: CellData[][];
}

const Wrapper = styled.div<{ width: number; height: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-gap: 1px;
  border: 4px solid #fff;
  width: 100%;
  background: #333;
`;

const Stage: FC<Props> = ({ stage }) => (
  <Wrapper width={stage[0].length} height={stage.length}>
    {stage.map((row) =>
      row.map(({ type, x }) => <Cell type="block" mino="T" />)
    )}
  </Wrapper>
);

export default Stage;
