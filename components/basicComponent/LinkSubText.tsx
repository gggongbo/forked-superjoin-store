import { FC } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import Icon from '../Icon';

const buttonPalette = css<{ isSelected?: boolean }>`
  display: flex;
  flex-direction: row;
  background-color: ${props =>
    props.isSelected
      ? props.theme.colors.gray[3]
      : props.theme.colors.singletons.defaultBackground};
  border-radius: 6px;
  padding: 20px 15px 20px 15px;
  :hover {
    background-color: ${props => props.theme.colors.gray[1]};
  }
  :active,
  :visited {
    background-color: ${props => props.theme.colors.gray[3]};
  }
`;

const LinkSubTextBlock = styled.button`
  ${buttonPalette};
`;

const SubLinkText = styled.a`
  font-size: 15px;
  font-weight: 500;
  color: ${props => props.theme.colors.singletons.black};
  margin-left: 14px;
`;

interface LinkSubTextPropTypes {
  selectedRouter: string;
  title: string;
  routerName: string;
  icon: string;
}

const LinkSubText: FC<LinkSubTextPropTypes> = function LinkSubText(props) {
  const { selectedRouter, title, routerName, icon } = props;
  const isSelected = selectedRouter === routerName.split('/').pop();

  return (
    <Link href={routerName} passHref>
      <LinkSubTextBlock isSelected={isSelected}>
        <Icon name={icon} width={18} height={18} />
        <SubLinkText>{title}</SubLinkText>
      </LinkSubTextBlock>
    </Link>
  );
};
export default LinkSubText;
