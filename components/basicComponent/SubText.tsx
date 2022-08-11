import { FC } from 'react';
import styled, { css } from 'styled-components';
import Icon from '../Icon';

const buttonPalette = css`
  display: flex;
  flex-direction: row;
  background-color: ${props => props.theme.colors.singletons.defaultBackground};
  border-radius: 6px;
  padding: 20px 15px 20px 15px;
  :hover {
    background-color: ${props =>
      `${props.theme.colors.singletons.pressGreen}24`};
  }
  :active,
  :visited {
    background-color: ${props =>
      `${props.theme.colors.singletons.pressGreen}60`};
  }
`;

const SubTextBlock = styled.button`
  ${buttonPalette};
`;

const SubTextTitle = styled.a`
  font-size: 14px;
  color: ${props => props.theme.colors.singletons.black};
  margin-left: 10px;
`;

interface SubTextPropTypes {
  title: string;
  icon: { name: string; width: number; height: number };
  onClick: Function;
}

const SubText: FC<SubTextPropTypes> = function SubText(props) {
  const { title, icon, onClick } = props;

  return (
    <SubTextBlock onClick={onClick?.()}>
      <Icon name={icon.name} width={icon.width} height={icon.height} />
      <SubTextTitle>{title}</SubTextTitle>
    </SubTextBlock>
  );
};
export default SubText;
