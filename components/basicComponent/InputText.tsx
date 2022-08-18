import { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';

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
      : props.theme.colors.gray[3]};
  :hover {
    border-color: ${props =>
      props.isFocused
        ? props.theme.colors.singletons.textGreen
        : `${props.theme.colors.singletons.textGreen}50`};
  }
`;

const InputTextfield = styled.input`
  width: 100%;
  height: 100%;
  border: 0px;
  outline: none;
  font-size: 14px;
  margin: 10px 16px;
`;

const InputTextAreaBlock = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 16px;
`;

const InputTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  border: 0px;
  outline: none;
  font-size: 14px;
  font-family: 'Noto Sans KR';
  font-weight: normal;
  line-height: normal;
`;

interface InputTextProps {
  rightComponent?: ReactNode;
  width?: number;
  height?: number;
  isArea?: boolean;
}

const InputText: FC<InputTextProps> = function InputText(props) {
  const { rightComponent, width = 0, height = 0, isArea } = props;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputTextBlock isFocused={isFocused} width={width} height={height}>
      {isArea ? (
        <InputTextAreaBlock>
          <InputTextArea
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </InputTextAreaBlock>
      ) : (
        <InputTextfield
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      )}
      {rightComponent && rightComponent}
    </InputTextBlock>
  );
};

InputText.defaultProps = {
  rightComponent: null,
  width: 0,
  height: 0,
  isArea: false,
};

export default InputText;
