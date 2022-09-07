import styled, { css, CSSProp } from 'styled-components';
import { FC } from 'react';
import * as IconList from './basic';

interface IconPropType {
  name: string;
  width?: number;
  height?: number;
  color?: string;
  colorIndex?: number;
  opacity?: number | string;
  customStyle?: CSSProp;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: any) => void;
}

interface IconType {
  width: string;
  height: string;
  src: string;
}

interface IconsType {
  [key: string]: IconType;
}

const Icons: IconsType = {
  ...IconList,
};

const IconBlock = styled.div`
  display: flex;
`;

const iconStyle = css<{
  width?: number;
  height?: number;
  customStyle?: CSSProp;
  disabled?: boolean;
}>`
  width: ${({ width }) => width || 0}px;
  height: ${({ height }) => height || 0}px;
  ${({ customStyle, disabled }) => !disabled && customStyle};
`;

const ColoredIcon = styled.div<{
  name: string;
  width?: number;
  height?: number;
  color: string;
  colorIndex?: number;
  opacity?: number | string;
  customStyle?: CSSProp;
  disabled?: boolean;
}>`
  background-color: ${props =>
    props.colorIndex
      ? props.theme.colors[props.color][props.colorIndex] + props.opacity
      : (props.theme.colors.singletons[props.color] || props.color) +
        props.opacity};
  mask: url(${props => Icons[props.name]?.src});
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: auto;
  ${iconStyle};
`;

const DefaultIcon = styled.div<{
  name: string;
  width?: number;
  height?: number;
  customStyle?: CSSProp;
  disabled?: boolean;
}>`
  background-image: url(${props => Icons[props.name]?.src});
  background-position: center;
  background-size: cover;
  ${iconStyle};
`;

const Icon: FC<IconPropType> = function Icon(props) {
  const {
    name,
    width,
    height,
    color,
    colorIndex,
    opacity,
    customStyle,
    disabled,
    onClick,
  } = props;

  return (
    <IconBlock>
      {color && color?.length > 0 ? (
        <ColoredIcon
          name={name}
          width={width}
          height={height}
          color={color}
          colorIndex={colorIndex}
          opacity={opacity}
          customStyle={customStyle}
          disabled={disabled}
          onClick={onClick}
        />
      ) : (
        <DefaultIcon
          name={name}
          width={width}
          height={height}
          customStyle={customStyle}
          disabled={disabled}
          onClick={onClick}
        />
      )}
    </IconBlock>
  );
};

Icon.defaultProps = {
  width: 0,
  height: 0,
  color: undefined,
  colorIndex: undefined,
  opacity: '',
  customStyle: {},
  disabled: false,
  onClick: () => {},
};
export default Icon;
