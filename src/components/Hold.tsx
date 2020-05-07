import React, { FC, memo } from 'react';
import { MinoType } from 'tetriminos';
import styled from 'styled-components';
import MinoBox from 'components/MinoBox';
import StyledBox from 'components/StyledBox';

type Props = {
  hold: MinoType | null;
};

const MemoisedMinoBox = memo(MinoBox);

const Hold: FC<Props> = ({ hold }) => {
  return (
    <Container>
      <StyledBox>HOLD</StyledBox>
      <MemoisedMinoBox minoType={hold} />
    </Container>
  );
};

const Container = styled.div`
  display: block;
  padding: 0;
`;

export default Hold;
