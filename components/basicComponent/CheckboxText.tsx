import { FC } from 'react';
import styled, { CSSProp } from 'styled-components';

import Oval from '@components/basicComponent/Oval';
import Icon from '@components/Icon';

const CheckboxTextBlock = styled.div<{ customStyle?: CSSProp }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${({ customStyle }) => customStyle};
`;

const UncheckedBlock = styled(Oval)`
  background-color: ${({ theme }) => theme.colors.gray[3]};
`;

const CheckedBlock = styled.div<{ width: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.singletons.black};
  border-radius: 100px;
  aspect-ratio: 1;
  width: ${({ width }) => (width > 0 ? `${width}px` : '100%')};
`;

const TitleTextBlock = styled.div<{
  titleSize?: number;
  color?: string;
  disabled?: boolean;
}>`
  font-size: ${({ titleSize }) => titleSize}px;
  color: ${({ color, theme }) =>
    color && color?.length > 1 ? color : theme.colors.text[6]};
  color: ${({ disabled, theme }) => disabled && `${theme.colors.text[6]}60`};
  margin-left: 10px;
  text-align: center;
`;

interface CheckboxTextPropTypes {
  title: string;
  titleSize?: number;
  color?: string;
  disabled?: boolean;
  isChecked?: boolean;
  customStyle?: CSSProp;
  // eslint-disable-next-line react/no-unused-prop-types
  onClick?: () => void;
}

const CheckboxText: FC<CheckboxTextPropTypes> = function CheckboxText(props) {
  const {
    title,
    titleSize = 13,
    color,
    disabled,
    isChecked,
    customStyle,
    onClick,
  } = props;

  return (
    <CheckboxTextBlock customStyle={customStyle} onClick={onClick}>
      {isChecked ? (
        <CheckedBlock width={20}>
          <Icon width={10} height={10} name="Check" color="white" />
        </CheckedBlock>
      ) : (
        <UncheckedBlock width={20} height={20} />
      )}
      <TitleTextBlock titleSize={titleSize} color={color} disabled={disabled}>
        {title}
      </TitleTextBlock>
    </CheckboxTextBlock>
  );
};

CheckboxText.defaultProps = {
  titleSize: 13,
  color: '',
  disabled: false,
  isChecked: false,
  customStyle: {},
  onClick: () => {},
};

export default CheckboxText;
