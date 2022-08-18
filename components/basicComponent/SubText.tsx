import { FC } from 'react';
import styled from 'styled-components';
import Icon from '../Icon';

const SubTextBlock = styled.div`
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
    background-color: ${({ theme }) =>
      `${theme.colors.singletons.pressGreen}24`};
  }
  :active,
  :visited {
    background-color: ${({ theme }) =>
      `${theme.colors.singletons.pressGreen}60`};
  }
`;

const SubTextTitle = styled.a`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.singletons.black};
  margin-left: 10px;
`;

interface SubTextPropTypes {
  title: string;
  icon: { name: string; width: number; height: number };
  onClick: () => void;
}

const SubText: FC<SubTextPropTypes> = function SubText(props) {
  const { title, icon, onClick } = props;

  return (
    <SubTextBlock onClick={onClick}>
      <SubHoverBlock>
        <Icon name={icon.name} width={icon.width} height={icon.height} />
        <SubTextTitle>{title}</SubTextTitle>
      </SubHoverBlock>
    </SubTextBlock>
  );
};
export default SubText;
