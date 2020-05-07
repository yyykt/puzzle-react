import styled from 'styled-components';

type Props = {
  background?: string;
  border?: string;
  padding?: string;
};

const StyledBox = styled.div<Props>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  /* margin: 0 0 20px 0; */
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
  border-radius: 10px;
  width: 100%;
  height: 50px;
  font-size: 0.8em;
  background: ${(props) => props.background};
`;

StyledBox.defaultProps = {
  background: '#FFF',
  border: '4px solid black',
  padding: '5%',
};

export default StyledBox;
