import { FC } from 'react';
import styled, { CSSProp } from 'styled-components';
import { IconType } from '~/types/basicComponent';
import Icon from '../Icon';

const SubTextBlock = styled.div<{ customStyle?: CSSProp }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${({ customStyle }) => customStyle};
`;

const SubTextTitle = styled.div<{
  titleSize?: number;
  color?: string;
  disabled?: boolean;
}>`
  font-size: ${({ titleSize }) => titleSize}px;
  color: ${({ color, theme }) =>
    color && color?.length > 1 ? color : theme.colors.text[4]};
  color: ${({ disabled, theme }) => disabled && `${theme.colors.text[4]}60`};
  margin-left: 10px;
  text-align: center;
`;

interface SubTextPropTypes {
  title: string;
  icon: IconType;
  titleSize?: number;
  color?: string;
  disabled?: boolean;
  customStyle?: CSSProp;
}

const SubText: FC<SubTextPropTypes> = function SubText(props) {
  const { title, icon, titleSize = 14, color, disabled, customStyle } = props;

  return (
    <SubTextBlock customStyle={customStyle}>
      <Icon
        name={icon.name}
        width={icon.width}
        height={icon.height}
        color={icon?.color}
        colorIndex={icon?.colorIndex}
        opacity={icon?.opacity}
      />
      <SubTextTitle titleSize={titleSize} color={color} disabled={disabled}>
        {title}
      </SubTextTitle>
    </SubTextBlock>
  );
};

SubText.defaultProps = {
  titleSize: 13,
  color: '',
  disabled: false,
  customStyle: {},
};

export default SubText;
