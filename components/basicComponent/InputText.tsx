import { FC, ReactNode, useState, useCallback, useMemo } from 'react';
import styled, { css, CSSProp } from 'styled-components';
import { PlaceholderColor } from '~/types/basicComponent';
import Icon from '@components/Icon';
import { debounce } from 'lodash';

const InputTextBlock = styled.div<{
  isFocused: boolean;
  width: number;
  height: number;
  customStyle?: CSSProp;
  disabled?: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${({ width }) => (width > 0 ? `${width}px` : '100%')};
  height: ${({ height }) => (height > 0 ? `${height}px` : '100%')};
  padding: 10px 12px 10px 0px;
  border-radius: 6px;
  border: 1px solid
    ${({ isFocused, theme }) =>
      isFocused
        ? theme.colors.singletons.textGreen
        : theme.colors.singletons.enabledGray};
  border-color: ${({ disabled, theme }) => disabled && theme.colors.gray[2]};

  :hover {
    border-color: ${({ isFocused, theme }) =>
      isFocused
        ? theme.colors.singletons.textGreen
        : `${theme.colors.singletons.textGreen}50`};
    border-color: ${({ disabled, theme }) => disabled && theme.colors.gray[2]};
  }
  ${({ customStyle }) => customStyle};
`;

const placeholderCommonStyle = css<{
  placeholderColor: PlaceholderColor;
  disabled?: boolean;
}>`
  color: ${({ placeholderColor, theme }) =>
    placeholderColor.index
      ? theme.colors[placeholderColor.color][placeholderColor.index] +
        (placeholderColor?.opacity || '')
      : (theme.colors.singletons[placeholderColor.color] ||
          placeholderColor.color) + (placeholderColor.opacity || '')};
  color: ${({ disabled, theme }) => disabled && theme.colors.text[1]};
`;

// 합치면 css 미적용돼서 따로 선언
const placeholderStyle = css`
  ::-webkit-input-placeholder {
    ${placeholderCommonStyle};
  }

  ::-moz-placeholder {
    ${placeholderCommonStyle};
  }

  :-ms-input-placeholder {
    ${placeholderCommonStyle};
  }

  :-moz-placeholder {
    ${placeholderCommonStyle};
  }

  ::placeholder {
    ${placeholderCommonStyle};
  }
`;

const InputTextField = styled.input<{
  placeholderColor: PlaceholderColor;
  disabled?: boolean;
}>`
  width: 100%;
  height: 100%;
  border: 0px;
  outline: none;
  margin-right: 4px;
  margin-left: 16px;
  font-size: 14px;
  font-family: 'Noto Sans KR';
  font-weight: normal;
  line-height: normal;
  :disabled {
    background-color: ${({ theme }) =>
      theme.colors.singletons.defaultBackground};
    color: ${({ theme }) => theme.colors.text[1]};
  }
  ${placeholderStyle};
`;

const InputTextAreaBlock = styled.div`
  width: 100%;
  height: 100%;
  padding-right: 4px;
  padding-left: 16px;
`;

const InputTextArea = styled.textarea<{
  placeholderColor: PlaceholderColor;
  disabled?: boolean;
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
  defaultValue?: string | number | undefined;
  valueType?: string | undefined;
  rightComponent?: ReactNode;
  width?: number;
  height?: number;
  isArea?: boolean;
  disabled?: boolean;
  placeholder?: string;
  placeholderColor?: PlaceholderColor;
  customStyle?: CSSProp;
  showPassword?: boolean;
  setShowPassword?: () => void;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: any) => void;
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: any) => void;
}

const InputText: FC<InputTextProps> = function InputText(props) {
  const {
    onPassword,
    type,
    defaultValue,
    valueType,
    rightComponent,
    width = 0,
    height = 0,
    isArea,
    disabled,
    placeholder,
    placeholderColor = { color: 'text', index: 2, opacity: '' },
    customStyle,
    onChange,
    onClick,
    showPassword,
    setShowPassword,
  } = props;
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onChangeInput = useCallback(
    (event: any) => {
      const getInputType = valueType;
      const getInputValue = event.target.value;
      const getInput = { type: getInputType, value: getInputValue };
      const { target } = event;
      target.valueObject = getInput;
      const chengedEvent = { ...event, target };
      onChange?.(chengedEvent);
    },
    [onChange, valueType],
  );

  const debounceSetInput = useMemo(
    () => debounce(onChangeInput, 300),
    [onChangeInput],
  );

  const handleInput = useCallback(
    (e: any) => {
      debounceSetInput(e);
    },
    [debounceSetInput],
  );

  return (
    <InputTextBlock
      isFocused={isFocused}
      width={width}
      height={height}
      disabled={disabled}
      customStyle={customStyle}
    >
      {isArea ? (
        <InputTextAreaBlock>
          <InputTextArea
            defaultValue={defaultValue}
            disabled={disabled}
            onClick={onClick}
            onChange={handleInput}
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
            defaultValue={defaultValue}
            disabled={disabled}
            onClick={onClick}
            onChange={handleInput}
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
  defaultValue: undefined,
  valueType: undefined,
  rightComponent: null,
  width: 0,
  height: 0,
  isArea: false,
  disabled: false,
  placeholder: '',
  placeholderColor: { color: 'text', index: 2, opacity: '' },
  customStyle: {},
  onChange: () => {},
  onClick: () => {},
};

export default InputText;
