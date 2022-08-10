import styled from 'styled-components';

const Oval = styled.div<{ width: number; height: number; color?: string }>`
  border-radius: 100px;
  border-style: solid;
  border-width: 0px;
  height: ${props => props.width || 1}px;
  width: ${props => props.height || 1}px;
  background-color: ${props =>
    props.color || props.theme.colors.singletons.black};
`;

export default Oval;
