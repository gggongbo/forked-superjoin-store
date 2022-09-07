import {
  FC,
  useRef,
  useCallback,
  useState,
  useEffect,
  KeyboardEvent,
  MouseEvent,
  useMemo,
} from 'react';
import styled, { css } from 'styled-components';
import { useInClick } from '@hooks/useInClick';
import { Option, PlaceholderColor } from '~/types/basicComponent';
import Icon from '../Icon';

const SelectBoxBlock = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: ${({ width }) => (width > 0 ? `${width}px` : '100%')};
`;

const SelectBlock = styled.label<{
  inClicked: boolean;
  borderRadius?: string;
  customSize?: string;
}>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: solid 1px;
  border-radius: ${({ borderRadius }) => borderRadius || '6px'};
  padding: ${({ customSize }) => {
    switch (customSize) {
      case 'small':
        return '5px 8px 5px 12px';
      case 'medium':
        return '10px 12px 10px 16px';
      default:
        return null;
    }
  }};

  border-color: ${props =>
    props.inClicked
      ? props.theme.colors.singletons.textGreen
      : props.theme.colors.singletons.enabledGray};
  :hover {
    border-color: ${props =>
      props.inClicked
        ? props.theme.colors.singletons.textGreen
        : `${props.theme.colors.singletons.textGreen}50`};
  }
`;

const placeholderTextColor = css<{ placeholderColor: PlaceholderColor }>`
  ${({ placeholderColor, theme }) =>
    placeholderColor.index
      ? theme.colors[placeholderColor.color][placeholderColor.index] +
        (placeholderColor?.opacity || '')
      : (theme.colors.singletons[placeholderColor.color] ||
          placeholderColor.color) + (placeholderColor.opacity || '')};
`;

const Select = styled.select<{
  placeholderColor: PlaceholderColor;
  placeholderValue: number | string | undefined;
  customSize?: string;
}>`
  display: flex;
  flex: 1;
  border: 0px;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-size: ${({ customSize }) => {
    switch (customSize) {
      case 'small':
        return '12px';
      case 'medium':
        return '14px';
      default:
        return null;
    }
  }};
  font-family: 'Noto Sans KR';
  background-color: ${({ theme }) =>
    `${theme.colors.singletons.defaultBackground}00`};
  color: ${({ value, placeholderValue, theme }) =>
    !value && placeholderValue
      ? placeholderTextColor
      : theme.colors.singletons.black};
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

const SelectItem = styled.li<{ isSelected: boolean; customSize?: string }>`
  padding: 8px 20px 8px 20px;
  font-size: ${({ customSize }) => {
    switch (customSize) {
      case 'small':
        return '12px';
      case 'medium':
        return '14px';
      default:
        return null;
    }
  }};
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
  placeholder?: number | string;
  placeholderColor?: PlaceholderColor;
  width?: number;
  borderRadius?: string;
  customSize?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: any) => void;
}

const SelectBox: FC<SelectboxProps> = function SelectBox(props) {
  const {
    optionList = [],
    defaultOption,
    placeholder,
    placeholderColor = { color: 'text', index: 2, opacity: '' },
    customSize = 'medium',
    width = 0,
    borderRadius,
    onChange,
  } = props;
  const selectRef = useRef(null);
  const { inClicked, setInClikced } = useInClick(selectRef);
  const [selectOption, setSelectOption] = useState<number | string>(
    defaultOption?.value || '',
  );
  const [selectHeight, setSelectHeight] = useState<number>(0);

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
      const optionValue = option?.value || e.target.value;
      setSelectOption(optionValue);
      setInClikced(false);
      const { target } = e;
      target.selectValue = optionValue;
      const chengedEvent = { ...e, target };
      onChange?.(chengedEvent);
    },
    [onChange, setInClikced],
  );

  const iconSize = useMemo(() => {
    switch (customSize) {
      case 'small':
        return 18;
      case 'medium':
        return 20;
      default:
        return 0;
    }
  }, [customSize]);

  return (
    <SelectBoxBlock width={width}>
      <SelectBlock
        role="group"
        aria-label="select"
        ref={selectRef}
        customSize={customSize}
        onKeyDown={handleKeyDown}
        onMouseDown={handleOpenSelectBox}
        inClicked={inClicked}
        borderRadius={borderRadius}
      >
        <Select
          value={selectOption}
          onChange={handleSelectBox}
          customSize={customSize}
          placeholderColor={placeholderColor}
          placeholderValue={placeholder}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {optionList?.map((option: Option) => (
            <option key={option?.value} value={option?.value}>
              {option?.name}
            </option>
          ))}
        </Select>
        <Icon
          name="ChevronDown"
          width={iconSize}
          height={iconSize}
          color="black"
        />
      </SelectBlock>
      {inClicked && (
        <SelectItemBlock
          role="group"
          aria-label="dropdown-list"
          selectHeight={selectHeight}
        >
          {optionList?.map((option: Option) => (
            <SelectItem
              key={option?.value}
              onClick={e => handleSelectBox(e, option)}
              isSelected={option?.value === selectOption}
              customSize={customSize}
            >
              {option?.name}
            </SelectItem>
          ))}
        </SelectItemBlock>
      )}
    </SelectBoxBlock>
  );
};

SelectBox.defaultProps = {
  defaultOption: { name: '', value: '' },
  placeholder: '',
  placeholderColor: { color: 'text', index: 2, opacity: '' },
  width: 0,
  borderRadius: '6px',
  customSize: 'medium',
  onChange: () => {},
};

export default SelectBox;
