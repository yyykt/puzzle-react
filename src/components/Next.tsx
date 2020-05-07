import React, { FC, memo } from 'react';
import { MinoType } from 'tetriminos';
import styled from 'styled-components';
import MinoBox from 'components/MinoBox';
import StyledBox from 'components/StyledBox';

type Props = {
  next: (MinoType | null)[];
};

const MemoisedMinoBox = memo(MinoBox);

const Next: FC<Props> = ({ next }) => {
  return (
    <Container>
      <StyledBox>NEXT</StyledBox>
      {next.map((e, i) => (
        // no key warning
        <MemoisedMinoBox minoType={e} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: block;
  padding: 0;
`;

export default Next;
