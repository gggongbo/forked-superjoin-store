import { FC } from 'react';
import styled, { CSSProp } from 'styled-components';

import Icon from '@components/Icon';
import { IconType } from '@constants/types/components';

const SubTextBlock = styled.div<{ customStyle?: CSSProp }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${({ customStyle }) => customStyle};
`;

const SubTextTitle = styled.div<{
  titleStyle?: CSSProp;
  titleSize?: number;
  color?: string;
  disabled?: boolean;
}>`
  font-size: ${({ titleSize }) => titleSize}px;
  color: ${({ color, theme }) =>
    color && color?.length > 1 ? color : theme.colors.text[400]};
  color: ${({ disabled, theme }) => disabled && `${theme.colors.text[400]}60`};
  margin-left: 10px;
  text-align: center;
  ${({ titleStyle }) => titleStyle};
`;

interface SubTextPropTypes {
  title: string;
  icon: IconType;
  titleSize?: number;
  color?: string;
  disabled?: boolean;
  customStyle?: CSSProp;
  titleStyle?: CSSProp;
}

const SubText: FC<SubTextPropTypes> = function SubText(props) {
  const {
    title,
    icon,
    titleSize = 14,
    color,
    disabled,
    customStyle,
    titleStyle,
  } = props;

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
      <SubTextTitle
        titleStyle={titleStyle}
        titleSize={titleSize}
        color={color}
        disabled={disabled}
      >
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
  titleStyle: {},
};

export default SubText;
