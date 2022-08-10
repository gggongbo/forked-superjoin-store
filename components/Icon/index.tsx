import styled from 'styled-components';
import { FC } from 'react';
import * as IconList from './basic';

interface IconPropType {
  name: string;
  width?: number;
  height?: number;
  color?: string;
  colorIndex?: number;
  opacity?: number | string;
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

const ColoredIcon = styled.div<{
  name: string;
  width?: number;
  height?: number;
  color: string;
  colorIndex?: number;
  opacity?: number | string;
}>`
  width: ${props => props.width || 0}px;
  height: ${props => props.height || 0}px;
  background-color: ${props =>
    props.colorIndex
      ? props.theme.colors[props.color][props.colorIndex] + props.opacity
      : (props.theme.colors.singletons[props.color] || props.color) +
        props.opacity};
  mask: url(${props => Icons[props.name]?.src});
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: auto;
`;

const DefaultIcon = styled.div<{
  name: string;
  width?: number;
  height?: number;
}>`
  width: ${props => props.width || 0}px;
  height: ${props => props.height || 0}px;
  background-image: url(${props => Icons[props.name]?.src});
  background-position: center;
  background-size: cover;
`;

const Icon: FC<IconPropType> = function Icon(props) {
  const { name, width, height, color, colorIndex, opacity } = props;

  return (
    <div>
      {color && color?.length > 0 ? (
        <ColoredIcon
          name={name}
          width={width}
          height={height}
          color={color}
          colorIndex={colorIndex}
          opacity={opacity}
        />
      ) : (
        <DefaultIcon name={name} width={width} height={height} />
      )}
    </div>
  );
};

Icon.defaultProps = {
  width: 0,
  height: 0,
  color: undefined,
  colorIndex: undefined,
  opacity: '',
};
export default Icon;
