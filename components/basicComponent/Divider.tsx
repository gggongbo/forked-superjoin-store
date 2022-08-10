import styled from 'styled-components';

const Divider = styled.div<{ isVertical: boolean }>`
  border-color: ${props => props.theme.colors.gray[3]};
  border-style: solid;
  border-width: 0px;
  border-right-width: ${props => (props.isVertical ? 1 : 0)}px;
  border-bottom-width: ${props => (props.isVertical ? 0 : 1)}px;
  width: ${props => (props.isVertical ? 0 : 100)}%;
  height: ${props => (props.isVertical ? 100 : 0)}%;
`;

export default Divider;
