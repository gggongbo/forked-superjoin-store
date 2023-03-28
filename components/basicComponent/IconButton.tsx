import { FC } from 'react';
import styled, { CSSProp } from 'styled-components';

import Icon from '@components/Icon';
import { ButtonType, IconType } from '@constants/types/components';

const ButtonBlock = styled.button<{
  width: number;
  customStyle?: CSSProp;
}>`
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
    border-color: ${({ theme }) => theme.colors.gray[300]};
    background-color: ${({ theme }) => `${theme.colors.green[100]}24`};
  }
  :active {
    border-color: ${({ theme }) => theme.colors.gray[300]};
    background-color: ${({ theme }) => `${theme.colors.green[100]}60`};
  }
  :disabled {
    border-color: ${({ theme }) => theme.colors.gray[200]};
  }
  ${({ customStyle }) => customStyle};
`;

interface ButtonProps {
  width?: number;
  icon: IconType;
  type?: ButtonType;
  disabled?: boolean;
  customStyle?: CSSProp;
  onClick?: () => void;
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
        color={disabled ? 'gray' : icon.color || 'black'}
        colorIndex={disabled ? 300 : icon.colorIndex || undefined}
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
