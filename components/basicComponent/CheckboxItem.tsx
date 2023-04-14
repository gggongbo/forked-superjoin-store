import { FC, useState, useCallback } from 'react';
import styled from 'styled-components';

import Oval from '@components/BasicComponent/Oval';
import Icon from '@components/Icon';

const CheckboxItemBlock = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const UncheckedBlock = styled(Oval)`
  background-color: ${({ theme }) => theme.colors.singletons.white};
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

interface CheckboxItemProps {
  width?: number;
  iconSize?: number;
  disabled?: boolean;
  value: any;
  // eslint-disable-next-line no-unused-vars
  onValueChange: (value: any, isSelected: boolean) => void;
}

const CheckboxItem: FC<CheckboxItemProps> = function CheckboxItem(props) {
  const {
    width = 20,
    iconSize = 10,
    disabled = false,
    value,
    onValueChange,
  } = props;
  const [checkedValue, setCheckedValue] = useState<any>();

  const handleCheckBox = useCallback(
    (e: any, itemValue: any, itemDisabled: boolean) => {
      if (itemDisabled) return;
      if (!itemValue) return;
      setCheckedValue((prev: any) => {
        if (!prev) {
          onValueChange?.(itemValue, true);
          return itemValue;
        }
        onValueChange?.(itemValue, false);
        return null;
      });
    },
    [onValueChange],
  );

  return (
    <CheckboxItemBlock
      value={value}
      key={value}
      onMouseUp={e => handleCheckBox(e, value, disabled)}
    >
      {checkedValue === value ? (
        <CheckedBlock width={width}>
          <Icon width={iconSize} height={iconSize} name="Check" color="white" />
        </CheckedBlock>
      ) : (
        <UncheckedBlock width={width} height={width} />
      )}
    </CheckboxItemBlock>
  );
};

CheckboxItem.defaultProps = {
  width: 20,
  iconSize: 10,
  disabled: false,
};

export default CheckboxItem;
