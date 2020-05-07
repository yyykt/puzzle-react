import React, { FC } from 'react';
import MINOINFOS, { MinoType, PREVIEW_SHAPES } from 'tetriminos';
import Cell from 'components/Cell';
import styled from 'styled-components';
import StyledBox from 'components/StyledBox';
import { Mino } from 'gameHelper';

type Props = {
  minoType: MinoType | null;
};

const Minobox: FC<Props> = ({ minoType }) => {
  if (minoType === null)
    return <StyledBox background="black" border="4px solid white" />;
  const shape = PREVIEW_SHAPES[minoType];
  const [width, height] = [shape[0].length, shape.length];
  const padding = (() => {
    if (minoType === 'O') return '5% 20%';
    if (minoType === 'I') return '5% 0%';
    return '5% 5%';
  })();

  return (
    <StyledBox padding={padding} background="black" border="4px solid white">
      <GridBox width={width} height={height}>
        {shape.map((row) =>
          row.map((elem) =>
            elem ? (
              <Cell type="preview" minoType={minoType} />
            ) : (
              <Cell type="previewBg" />
            )
          )
        )}
      </GridBox>
    </StyledBox>
  );
};

type GridBoxProps = {
  width: number;
  height: number;
};

const GridBox = styled.div<GridBoxProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  /* grid-template-rows: 3; */
  grid-gap: 1px;
  /* border: 4px solid #fff; */
  box-sizing: border-box;
  width: 80%;
  margin: auto;
`;

export default Minobox;
