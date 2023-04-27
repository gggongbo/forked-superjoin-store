import _, { debounce } from 'lodash';
import { FC, useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import SelectBox from '@components/BasicComponent/Selectbox';
import Icon from '@components/Icon';
import { InputOptionType } from '@constants/types/components';

// todo: border entire wrap
const SelectInputBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputTextBlock = styled.div<{ isFocused: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-right: 1px solid;
  border-radius: 0px 6px 6px 0px;
  padding: 11px 12px 11px 0px;
  border-color: ${props =>
    props.isFocused
      ? props.theme.colors.green[600]
      : props.theme.colors.singletons.enabledGray};
  :hover {
    border-color: ${props =>
      props.isFocused
        ? props.theme.colors.green[600]
        : `${props.theme.colors.green[600]}50`};
  }
`;

const InputTextfield = styled.input`
  border: 0px;
  outline: none;
  font-size: 14px;
  margin-right: 16px;
  margin-left: 16px;
`;

interface SelectInputTextProps {
  optionList: InputOptionType[];
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: any) => void;
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: any) => void;
}

const SelectInputText: FC<SelectInputTextProps> = function InputText(props) {
  const { optionList, onChange, onClick } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [inputType, setInputType] = useState<string>();
  const [inputValue, setInputValue] = useState<string>();

  const handleSelectInputBox = useCallback(
    (e: any) => {
      const getInput = { type: inputType, value: inputValue };
      const { target } = e;
      target.valueObject = getInput;
      const chengedEvent = { ...e, target };
      onChange?.(chengedEvent);
    },
    [inputType, inputValue, onChange],
  );

  const onChangeInputValue = useCallback((event: any) => {
    setInputValue(event.target.value);
  }, []);

  const debounceSetInputValue = useMemo(
    () => debounce(onChangeInputValue, 300),
    [onChangeInputValue],
  );

  const handleInput = useCallback(
    (e: any) => {
      debounceSetInputValue(e);
    },
    [debounceSetInputValue],
  );

  return (
    <SelectInputBlock
      onChange={handleSelectInputBox}
      onMouseDown={handleSelectInputBox}
    >
      <SelectBox
        optionList={optionList?.map(option => {
          return {
            ...option,
            value: !_.isArray(option.value)
              ? option.value
              : JSON.stringify(option.value),
          };
        })}
        width={133}
        borderRadius="6px 0px 0px 6px"
        onChange={e => {
          setInputType(e.target.selectValue);
        }}
        placeholder={optionList[0]?.name}
      />
      <InputTextBlock isFocused={isFocused}>
        <InputTextfield
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={e => {
            handleInput(e);
          }}
        />
        <Icon
          name="Search"
          width={20}
          height={20}
          color="realBlack"
          onClick={onClick}
        />
      </InputTextBlock>
    </SelectInputBlock>
  );
};

SelectInputText.defaultProps = {
  onChange: () => {},
  onClick: () => {},
};

export default SelectInputText;
