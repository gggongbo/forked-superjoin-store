import { FC } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import Icon from '../Icon';

const buttonPalette = css<{ isSelected?: boolean }>`
  display: flex;
  flex-direction: row;
  background-color: ${props =>
    props.isSelected
      ? props.theme.colors.singletons.white
      : props.theme.colors.singletons.backgroundGray};
  border: 1px solid;
  border-color: ${props =>
    props.isSelected
      ? props.theme.colors.gray[3]
      : props.theme.colors.singletons.backgroundGray};

  border-radius: 6px;
  padding: 20px 15px 20px 15px;
  :hover {
    background-color: ${({ theme }) => `${theme.colors.singletons.white}60`};
  }
  :active,
  :visited {
    background-color: ${({ theme }) => theme.colors.singletons.white};
    border-color: ${({ theme }) => theme.colors.gray[3]};
  }
`;

const SubTextLinkBlock = styled.button`
  ${buttonPalette};
`;

const SubLinkText = styled.a`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.singletons.black};
  margin-left: 14px;
`;

interface SubTextLinkPropTypes {
  selectedRouter: string;
  title: string;
  routerName: string;
  icon: string;
}

const SubTextLink: FC<SubTextLinkPropTypes> = function SubTextLink(props) {
  const { selectedRouter, title, routerName, icon } = props;
  const isSelected = selectedRouter === routerName.split('/').pop();

  return (
    <Link href={routerName} passHref>
      <SubTextLinkBlock isSelected={isSelected}>
        <Icon name={icon} width={18} height={18} />
        <SubLinkText>{title}</SubLinkText>
      </SubTextLinkBlock>
    </Link>
  );
};
export default SubTextLink;
