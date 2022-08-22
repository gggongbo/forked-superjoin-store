import { FC, ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';
import { PlaceholderColor } from '~/types/basicComponent';
import Icon from '@components/Icon';

const InputTextBlock = styled.div<{
  isFocused: boolean;
  width: number;
  height: number;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${({ width }) => (width > 0 ? `${width}px` : '100%')};
  height: ${({ height }) => (height > 0 ? `${height}px` : '100%')};
  border-radius: 6px;
  border: 1px solid
    ${props =>
      props.isFocused
        ? props.theme.colors.singletons.textGreen
        : props.theme.colors.singletons.enabledGray};

  :hover {
    border-color: ${props =>
      props.isFocused
        ? props.theme.colors.singletons.textGreen
        : `${props.theme.colors.singletons.textGreen}50`};
  }
`;

const placeholderColorStyle = css<{
  placeholderColor: PlaceholderColor;
}>`
  color: ${({ placeholderColor, theme }) =>
    placeholderColor.index
      ? theme.colors[placeholderColor.color][placeholderColor.index] +
        (placeholderColor?.opacity || '')
      : (theme.colors.singletons[placeholderColor.color] ||
          placeholderColor.color) + (placeholderColor.opacity || '')};
`;

// 합치면 css 미적용돼서 따로 선언
const placeholderStyle = css<{
  placeholderColor: PlaceholderColor;
}>`
  ::-webkit-input-placeholder {
    ${placeholderColorStyle};
  }

  ::-moz-placeholder {
    ${placeholderColorStyle};
  }

  :-ms-input-placeholder {
    ${placeholderColorStyle};
  }

  :-moz-placeholder {
    ${placeholderColorStyle};
  }

  ::placeholder {
    ${placeholderColorStyle};
  }
`;

const InputTextField = styled.input<{
  placeholderColor: PlaceholderColor;
}>`
  width: 100%;
  height: 100%;
  border: 0px;
  outline: none;
  font-size: 14px;
  margin: 10px 16px;
  ${placeholderStyle};
`;

const InputTextAreaBlock = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 16px;
`;

const InputTextArea = styled.textarea<{
  placeholderColor: PlaceholderColor;
}>`
  width: 100%;
  height: 100%;
  resize: none;
  border: 0px;
  outline: none;
  font-size: 14px;
  font-family: 'Noto Sans KR';
  font-weight: normal;
  line-height: normal;
  ${placeholderStyle};
`;

interface InputTextProps {
  onPassword?: boolean;
  type?: string;
  rightComponent?: ReactNode;
  width?: number;
  height?: number;
  isArea?: boolean;
  placeholder?: string;
  placeholderColor?: PlaceholderColor;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: any) => void;
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: any) => void;
  style?: object;
  showPassword?: boolean;
  setShowPassword?: () => void;
}

const InputText: FC<InputTextProps> = function InputText(props) {
  const {
    onPassword,
    type,
    rightComponent,
    width = 0,
    height = 0,
    isArea,
    placeholder,
    placeholderColor = { color: 'text', index: 2, opacity: '' },
    style,
    onChange,
    onClick,
    showPassword,
    setShowPassword,
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputTextBlock
      isFocused={isFocused}
      width={width}
      height={height}
      style={style}
    >
      {isArea ? (
        <InputTextAreaBlock>
          <InputTextArea
            onClick={onClick}
            onChange={onChange}
            placeholder={placeholder}
            placeholderColor={placeholderColor}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </InputTextAreaBlock>
      ) : (
        <>
          <InputTextField
            type={type}
            onClick={onClick}
            onChange={onChange}
            placeholder={placeholder}
            placeholderColor={placeholderColor}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {onPassword ? (
            <Icon
              name={showPassword ? 'EyeOn' : 'EyeOff'}
              width={20}
              height={20}
              onClick={() => setShowPassword?.()}
            />
          ) : null}
        </>
      )}
      {rightComponent && rightComponent}
    </InputTextBlock>
  );
};

InputText.defaultProps = {
  showPassword: false,
  setShowPassword: () => {},
  onPassword: false,
  type: 'text',
  rightComponent: null,
  width: 0,
  height: 0,
  isArea: false,
  placeholder: '',
  placeholderColor: { color: 'text', index: 2, opacity: '' },
  style: {},
  onChange: () => {},
  onClick: () => {},
};

export default InputText;
