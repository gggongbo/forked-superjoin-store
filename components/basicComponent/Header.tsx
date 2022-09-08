import { FC, ReactNode } from 'react';
import styled, { CSSProp } from 'styled-components';

const HeaderBlock = styled.div<{
  customStyle?: CSSProp;
}>`
  ${({ customStyle }) => customStyle};
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 42px;
  margin-left: 8px;
`;

const HeaderTitleBlock = styled.div<{ titleStyle?: CSSProp }>`
  ${({ titleStyle }) => titleStyle};
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.55px;
`;

interface HeaderPropTypes {
  title?: string;
  titleComponent?: ReactNode;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  customStyle?: CSSProp;
  titleStyle?: CSSProp;
  onClick?: () => void;
}

const Header: FC<HeaderPropTypes> = function Header(props) {
  const {
    title,
    titleComponent,
    leftComponent,
    rightComponent,
    customStyle,
    titleStyle,
    onClick,
  } = props;
  return (
    <HeaderBlock onClick={onClick} customStyle={customStyle}>
      {leftComponent && leftComponent}
      {titleComponent || (
        <HeaderTitleBlock titleStyle={titleStyle}>{title}</HeaderTitleBlock>
      )}
      {rightComponent && rightComponent}
    </HeaderBlock>
  );
};

Header.defaultProps = {
  title: '',
  titleComponent: null,
  leftComponent: null,
  rightComponent: null,
  customStyle: {},
  titleStyle: {},
  onClick: () => {},
};

export default Header;
