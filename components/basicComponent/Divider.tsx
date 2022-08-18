import styled from 'styled-components';

const Divider = styled.div<{ isVertical: boolean }>`
  border-color: ${({ theme }) => theme.colors.gray[3]};
  border-style: solid;
  border-width: 0px;
  border-right-width: ${({ isVertical }) => (isVertical ? 1 : 0)}px;
  border-bottom-width: ${({ isVertical }) => (isVertical ? 0 : 1)}px;
  width: ${({ isVertical }) => (isVertical ? 0 : 100)}%;
  height: ${({ isVertical }) => (isVertical ? 100 : 0)}%;
`;

export default Divider;
