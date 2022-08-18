import {
  FC,
  useRef,
  useCallback,
  useState,
  useEffect,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import styled from 'styled-components';
import { useInClick } from '@hooks/useInClick';
import { Option } from '~/types/basicComponent';
import Icon from '../Icon';

const SelectBoxBlock = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: ${({ width }) => (width > 0 ? `${width}px` : '100%')};
`;

const SelectBlock = styled.label<{ inClicked: boolean; borderRadius?: string }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: solid 1px;
  border-radius: ${({ borderRadius }) => borderRadius || '6px'};
  padding: 10px 12px 10px 0px;
  border-color: ${props =>
    props.inClicked
      ? props.theme.colors.singletons.textGreen
      : props.theme.colors.gray[3]};
  :hover {
    border-color: ${props =>
      props.inClicked
        ? props.theme.colors.singletons.textGreen
        : `${props.theme.colors.singletons.textGreen}50`};
  }
`;

const Select = styled.select`
  border: 0px;
  margin-right: 16px;
  margin-left: 16px;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-size: 14px;
  font-family: 'Noto Sans KR';
`;

const SelectItemBlock = styled.ul<{
  selectHeight: number;
}>`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  max-height: 232px;
  margin-top: ${({ selectHeight }) => (selectHeight || 0) + 3}px;
  padding: 8px 0px 8px 0px;
  border-radius: 6px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.singletons.defaultBackground};
  -webkit-box-shadow: 0px 2px 10px 0px
    ${({ theme }) => `${theme.colors.singletons.realBlack}20`};
  box-shadow: 0px 2px 10px 0px
    ${({ theme }) => `${theme.colors.singletons.realBlack}20`};
  z-index: 999;
`;

const SelectItem = styled.li<{ isSelected: boolean }>`
  padding: 8px 20px 8px 20px;
  font-size: 14px;
  color: ${props =>
    props.isSelected
      ? props.theme.colors.singletons.textGreen
      : props.theme.colors.singletons.black};
  :hover {
    background-color: ${({ theme }) =>
      `${theme.colors.singletons.pressGreen}24`};
  }
  :active {
    background-color: ${({ theme }) =>
      `${theme.colors.singletons.pressGreen}60`};
  }
`;

interface SelectboxProps {
  optionList: Option[];
  defaultOption?: Option;
  width?: number;
  borderRadius?: string;
}

const SelectBox: FC<SelectboxProps> = function SelectBox(props) {
  const { optionList = [], defaultOption, width = 0, borderRadius } = props;
  const selectRef = useRef(null);
  const { inClicked, setInClikced } = useInClick(selectRef);
  const [selectOption, setSelectOption] = useState(defaultOption);
  const [selectHeight, setSelectHeight] = useState(0);

  useEffect(() => {
    if (selectRef.current) {
      const { clientHeight } = selectRef.current;
      setSelectHeight(clientHeight);
    }
  }, []);

  const handleOpenSelectBox = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      setInClikced(prev => !prev);
    },
    [setInClikced],
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    // if (!e.code) return;
    // if (e.code === 'Enter' || e.code === 'Space') {
    //   setInClikced(true);
    // }
  }, []);

  const handleSelectBox = useCallback(
    (e: any, option?: Option) => {
      const optionValue = option || e.target.value;
      setSelectOption(optionValue);
      setInClikced(false);
    },
    [setInClikced],
  );

  return (
    <SelectBoxBlock width={width}>
      <SelectBlock
        role="group"
        aria-label="select"
        ref={selectRef}
        onKeyDown={handleKeyDown}
        onMouseDown={handleOpenSelectBox}
        inClicked={inClicked}
        borderRadius={borderRadius}
      >
        <Select value={selectOption} onChange={handleSelectBox}>
          {optionList?.map((option: Option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <Icon name="ChevronDown" width={20} height={20} color="black" />
      </SelectBlock>
      {inClicked && (
        <SelectItemBlock
          role="group"
          aria-label="dropdown-list"
          selectHeight={selectHeight}
        >
          {optionList?.map((option: Option) => (
            <SelectItem
              key={option}
              onClick={e => handleSelectBox(e, option)}
              isSelected={option === selectOption}
            >
              {option}
            </SelectItem>
          ))}
        </SelectItemBlock>
      )}
    </SelectBoxBlock>
  );
};

SelectBox.defaultProps = {
  defaultOption: '',
  width: 0,
  borderRadius: '6px',
};

export default SelectBox;
