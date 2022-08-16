import { FC, ReactNode } from 'react';
import styled, { CSSObject } from 'styled-components';

const HeaderBlock = styled.div<{
  customStyle?: CSSObject;
}>`
  ${props => props.customStyle};
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
const HeaderTitleBlock = styled.a<{ titleStyle?: CSSObject }>`
  ${props => props.titleStyle};
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.55px;
`;

interface HeaderPropTypes {
  title: string;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  customStyle?: CSSObject;
  titleStyle?: CSSObject;
  onClick?: () => void;
  titleOnClick?: () => void;
}

const Header: FC<HeaderPropTypes> = function Header(props) {
  const {
    title,
    leftComponent,
    rightComponent,
    customStyle,
    titleStyle,
    onClick,
    titleOnClick,
  } = props;
  return (
    <HeaderBlock onClick={onClick} customStyle={customStyle}>
      {leftComponent && leftComponent}
      <HeaderTitleBlock onClick={titleOnClick} titleStyle={titleStyle}>
        {title}
      </HeaderTitleBlock>
      {rightComponent && rightComponent}
    </HeaderBlock>
  );
};

Header.defaultProps = {
  leftComponent: null,
  rightComponent: null,
  customStyle: {},
  titleStyle: {},
  onClick: () => {},
  titleOnClick: () => {},
};

export default Header;
