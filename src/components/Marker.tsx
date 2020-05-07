import React, { FC } from 'react';
import styled from 'styled-components';

type Props = {
  pos: 'center' | 'lowerRight' | 'upperLeft';
};

const Marker: FC<Props> = ({ pos }) => {
  return (
    <Container>
      <Circle pos={pos} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const size = '10px';
const offset = {
  center: `calc((100% - ${size}) / 2)`,
  lowerRight: `calc(100% - ${size} / 2)`,
  upperLeft: `calc(-${size} / 2)`,
};

const Circle = styled.div<Props>`
  width: 10px;
  height: 10px;
  border: 3px solid white;
  border-radius: 50%;
  box-sizing: border-box;
  margin: auto;
  /* vertical-align: middle; */
  top: ${(props) => offset[props.pos]};
  left: ${(props) => offset[props.pos]};
  position: absolute;
`;

export default Marker;
