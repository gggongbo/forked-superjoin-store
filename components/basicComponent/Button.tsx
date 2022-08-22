import { FC } from 'react';
import styled, { CSSProp } from 'styled-components';
import { Button as ButtonType } from '~/types/basicComponent';

const ButtonBlock = styled.button<{
  width: number;
  color: string;
  colorIndex?: number;
  opacity?: number | string;
  customStyle?: CSSProp;
}>`
  width: ${({ width }) => (width > 0 ? `${width}px` : '100%')};
  border-radius: 6px;
  padding: 12px 0px;
  align-items: center;
  background-color: ${props =>
    props.colorIndex
      ? props.theme.colors[props.color][props.colorIndex] + props.opacity
      : (props.theme.colors.singletons[props.color] || props.color) +
        props.opacity};
  -webkit-box-shadow: 0px 1px 1px 0px
    ${({ theme }) => `${theme.colors.singletons.realBlack}10`};
  box-shadow: 0px 1px 1px 0px
    ${({ theme }) => `${theme.colors.singletons.realBlack}10`};
  ${({ customStyle }) => customStyle};

  :hover {
    background-color: ${({ theme }) => `${theme.colors.singletons.black}50`};
  }

  :disabled {
    background: ${({ theme }) => theme.colors.gray[4]};
  }
`;

const ButtonText = styled.div<{ textStyle?: CSSProp }>`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.colors.singletons.white};
  ${({ textStyle }) => textStyle};
`;

interface ButtonProps {
  width?: number;
  text: string;
  color?: string;
  colorIndex?: number;
  opacity?: number | string;
  type?: ButtonType;
  onClick?: () => void;
  customStyle?: CSSProp;
  textStyle?: CSSProp;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = function Button(props) {
  const {
    width = 0,
    text,
    color = 'black',
    colorIndex,
    opacity,
    customStyle,
    textStyle,
    type = 'button',
    onClick,
    disabled,
  } = props;
  return (
    <ButtonBlock
      width={width}
      color={color}
      colorIndex={colorIndex}
      opacity={opacity}
      customStyle={customStyle}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <ButtonText textStyle={textStyle}>{text}</ButtonText>
    </ButtonBlock>
  );
};

Button.defaultProps = {
  width: 0,
  color: 'black',
  colorIndex: undefined,
  opacity: '',
  type: 'button',
  onClick: () => {},
  customStyle: {},
  textStyle: {},
  disabled: false,
};

export default Button;
