import { FC, useState } from 'react';
import styled from 'styled-components';
import { Option } from '~/types/basicComponent';
import Icon from '../Icon';
import SelectBox from './Selectbox';

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
  border-style: solid;
  border-width: 1px;
  border-radius: 0px 6px 6px 0px;
  padding: 10px 12px 10px 0px;
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

const InputTextfield = styled.input`
  border: 0px;
  outline: none;
  font-size: 14px;
  margin-right: 16px;
  margin-left: 16px;
`;

interface SelectInputTextProps {
  onClick?: () => void;
  optionList: Option[];
}

const SelectInputText: FC<SelectInputTextProps> = function InputText(props) {
  const { onClick, optionList } = props;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <SelectInputBlock>
      <SelectBox
        optionList={optionList}
        width={133}
        borderRadius="6px 0px 0px 6px"
      />
      <InputTextBlock isFocused={isFocused}>
        <InputTextfield
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
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
  onClick: () => {},
};

export default SelectInputText;
