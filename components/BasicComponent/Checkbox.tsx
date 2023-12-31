import {
  FC,
  useState,
  useCallback,
  useRef,
  KeyboardEvent,
  MouseEvent,
  useLayoutEffect,
} from 'react';
import styled, { css } from 'styled-components';

import Oval from '@components/BasicComponent/Oval';
import Icon from '@components/Icon';
import { OptionType } from '@constants/types/components';
import { useInClick } from '@hooks/useInClick';

const CheckboxBlock = styled.label<{
  inClicked: boolean;
}>`
  display: flex;
  flex-direction: column;
`;

const iconStyle = css`
  :hover {
    background-color: ${({ theme }) => theme.colors.green[500]};
  }
  :active {
    background-color: ${({ theme }) => theme.colors.green[600]};
  }
`;

const IconBlock = styled.div`
  align-self: flex-end;
  padding: 0px 16px;
`;

const CheckboxItemBlock = styled.ul<{
  checkboxPosition: { width: number; height: number };
}>`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-top: ${({ checkboxPosition }) => (checkboxPosition.height || 0) + 3}px;
  margin-left: ${({ checkboxPosition }) =>
    -((checkboxPosition.width || 0) + 8)}px;
  padding: 8px 0px;
  border-radius: 6px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.singletons.defaultBackground};
  -webkit-box-shadow: 0px 2px 10px 0px
    ${({ theme }) => `${theme.colors.singletons.realBlack}20`};
  box-shadow: 0px 2px 10px 0px
    ${({ theme }) => `${theme.colors.singletons.realBlack}20`};
  z-index: 999;
`;

const CheckboxItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 20px;
`;

const UncheckedBlock = styled(Oval)`
  background-color: ${({ theme }) => theme.colors.gray[300]};
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

const CheckboxText = styled.div`
  margin-left: 10px;
`;

interface CheckboxProps {
  optionList: OptionType[];
  setFilter?: Function;
}

const Checkbox: FC<CheckboxProps> = function Checkbox(props) {
  const { optionList = [], setFilter } = props;
  const [checkedOptionList, setCheckedOptionList] = useState<
    (string | number)[]
  >([]);
  const checkboxRef = useRef(null);
  const { inClicked, setInClicked } = useInClick(checkboxRef);
  const [checkboxPosition, setCheckboxPosition] = useState({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    if (checkboxRef.current) {
      const { clientHeight, clientWidth } = checkboxRef.current;
      setCheckboxPosition({ width: clientWidth, height: clientHeight });
    }
  }, []);

  const handleOpenCheckBox = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      setInClicked(true);
    },
    [setInClicked],
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
  }, []);

  const handleCheckBox = useCallback(
    (e: any, option?: OptionType) => {
      const optionValue = option?.value || e.target.value;
      const findIndex = checkedOptionList.findIndex(
        checkedOption => checkedOption === optionValue,
      );
      if (findIndex > -1) {
        checkedOptionList.splice(findIndex, 1);
        if (setFilter) setFilter([...checkedOptionList]);
        setCheckedOptionList([...checkedOptionList]);
      } else {
        checkedOptionList.push(optionValue);
        if (setFilter) setFilter([...checkedOptionList]);
        setCheckedOptionList([...checkedOptionList]);
      }
    },
    [checkedOptionList, setFilter],
  );

  return (
    <CheckboxBlock
      role="group"
      aria-label="checkbox"
      ref={checkboxRef}
      onKeyDown={handleKeyDown}
      onClick={handleOpenCheckBox}
      inClicked={inClicked}
    >
      <IconBlock>
        {inClicked ? (
          <Icon
            width={18}
            height={20}
            name="ListFilter"
            color="green"
            colorIndex={600}
            customStyle={iconStyle}
          />
        ) : (
          <Icon
            width={18}
            height={18}
            name="ListFilter"
            color="gray"
            colorIndex={600}
            customStyle={iconStyle}
          />
        )}
      </IconBlock>
      {inClicked && (
        <CheckboxItemBlock
          role="group"
          aria-label="dropdown-list"
          checkboxPosition={checkboxPosition}
        >
          {optionList.map((option: OptionType) => {
            return (
              <CheckboxItem
                value={option?.value}
                key={option?.value}
                onMouseUp={e => handleCheckBox(e, option)}
              >
                {checkedOptionList.includes(option?.value) ? (
                  <CheckedBlock width={20}>
                    <Icon width={10} height={10} name="Check" color="white" />
                  </CheckedBlock>
                ) : (
                  <UncheckedBlock width={20} height={20} />
                )}
                <CheckboxText>{option?.name}</CheckboxText>
              </CheckboxItem>
            );
          })}
        </CheckboxItemBlock>
      )}
    </CheckboxBlock>
  );
};

Checkbox.defaultProps = {
  setFilter: () => {},
};

export default Checkbox;
