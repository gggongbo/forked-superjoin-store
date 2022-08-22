import { FC, ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';
import { PlaceholderColor } from '~/types/basicComponent';

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
  border: solid 1px;
  border-radius: 6px;
  border-color: ${props =>
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

const InputTextfield = styled.input<{
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
  type?: string;
  rightComponent?: ReactNode;
  width?: number;
  height?: number;
  isArea?: boolean;
  placeholder?: string;
  placeholderColor?: PlaceholderColor;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: any) => void;
}

const InputText: FC<InputTextProps> = function InputText(props) {
  const {
    type,
    rightComponent,
    width = 0,
    height = 0,
    isArea,
    placeholder,
    placeholderColor = { color: 'text', index: 2, opacity: '' },
    onChange,
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputTextBlock isFocused={isFocused} width={width} height={height}>
      {isArea ? (
        <InputTextAreaBlock>
          <InputTextArea
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={onChange}
            placeholder={placeholder}
            placeholderColor={placeholderColor}
          />
        </InputTextAreaBlock>
      ) : (
        <InputTextfield
          type={type}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={onChange}
          placeholder={placeholder}
          placeholderColor={placeholderColor}
        />
      )}
      {rightComponent && rightComponent}
    </InputTextBlock>
  );
};

InputText.defaultProps = {
  type: 'text',
  rightComponent: null,
  width: 0,
  height: 0,
  isArea: false,
  placeholder: '',
  placeholderColor: { color: 'text', index: 2, opacity: '' },
  onChange: () => {},
};

export default InputText;
