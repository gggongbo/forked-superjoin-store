import { FC } from 'react';
import styled, { CSSProp } from 'styled-components';
import { Button as ButtonType, IconType } from '~/types/basicComponent';
import Icon from '../Icon';

const ButtonBlock = styled.button<{
  width: number;
  customStyle?: CSSProp;
}>`
  /* flex: 1; */
  /* display: flex; */
  /* width: ${({ width }) => (width > 0 ? `${width}px` : '100%')}; */
  aspect-ratio: 1;
  padding: 5px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.singletons.defaultBackground};
  border-width: 1px;
  border-style: solid;
  border-radius: 6px;
  border-color: ${({ theme }) => theme.colors.singletons.enabledGray};
  :hover {
    border-color: ${({ theme }) => theme.colors.gray[3]};
    background-color: ${({ theme }) =>
      `${theme.colors.singletons.pressGreen}24`};
  }
  :active {
    border-color: ${({ theme }) => theme.colors.gray[3]};
    background-color: ${({ theme }) =>
      `${theme.colors.singletons.pressGreen}60`};
  }
  :disabled {
    border-color: ${({ theme }) => theme.colors.gray[2]};
  }
  ${({ customStyle }) => customStyle};
`;

interface ButtonProps {
  width?: number;
  icon: IconType;
  type?: ButtonType;
  disabled?: boolean;
  customStyle?: CSSProp;
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: any) => void;
}

const IconButton: FC<ButtonProps> = function IconButton(props) {
  const {
    width = 0,
    icon,
    type = 'button',
    disabled,
    customStyle,
    onClick,
  } = props;
  return (
    <ButtonBlock
      width={width}
      customStyle={customStyle}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon
        width={icon.width}
        height={icon.height}
        name={icon.name}
        color={disabled ? 'gray' : 'black'}
        colorIndex={disabled ? 3 : undefined}
      />
    </ButtonBlock>
  );
};

IconButton.defaultProps = {
  width: 0,
  type: 'button',
  disabled: false,
  customStyle: {},
  onClick: () => {},
};

export default IconButton;
