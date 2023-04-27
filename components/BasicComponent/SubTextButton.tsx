import { FC } from 'react';
import styled from 'styled-components';

import Icon from '@components/Icon';
import { IconType } from '@constants/types/components';

const SubTextButtonBlock = styled.div`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.singletons.defaultBackground};
  border-radius: 6px;
  -webkit-box-shadow: 0px 2px 10px 0px
    ${({ theme }) => `${theme.colors.singletons.realBlack}20`};
  box-shadow: 0px 2px 10px 0px
    ${({ theme }) => `${theme.colors.singletons.realBlack}20`};
  z-index: 1000;
`;

const SubHoverBlock = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin: 8px 0px 8px 0px;
  padding: 8px 15px 8px 15px;
  :hover {
    background-color: ${({ theme }) => `${theme.colors.green[100]}24`};
  }
  :active,
  :visited {
    background-color: ${({ theme }) => `${theme.colors.green[100]}60`};
  }
`;

const SubTextTitle = styled.a`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.singletons.black};
  margin-left: 10px;
`;

interface SubTextButtonPropTypes {
  title: string;
  icon: IconType;
  onClick?: () => void;
}

const SubTextButton: FC<SubTextButtonPropTypes> = function SubTextButton(
  props,
) {
  const { title, icon, onClick } = props;

  return (
    <SubTextButtonBlock onClick={onClick}>
      <SubHoverBlock>
        <Icon name={icon.name} width={icon.width} height={icon.height} />
        <SubTextTitle>{title}</SubTextTitle>
      </SubHoverBlock>
    </SubTextButtonBlock>
  );
};
SubTextButton.defaultProps = {
  onClick: () => {},
};

export default SubTextButton;
