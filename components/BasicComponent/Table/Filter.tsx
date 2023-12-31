import { FC, useMemo } from 'react';
import { Row, FilterValue, Column, IdType } from 'react-table';

import Checkbox from '@components/BasicComponent/Checkbox';
import { OptionType } from '@constants/types/components';

interface SelectColumnFilterProps {
  column: Column<any> & {
    filterValue: FilterValue;
    setFilter: Function;
    preFilteredRows: Row[];
    id: IdType<any>;
  };
}

// 로우 필터링 로직
const FilterIncludes = (
  rows: Row[],
  id: IdType<any>,
  filterValue: FilterValue,
) =>
  rows?.filter((row: Row) => {
    if (!filterValue || filterValue?.length < 1) return true;
    const rowValue = row.values[id];
    const value =
      typeof rowValue === 'object' ? rowValue.props.option.value : rowValue;
    return filterValue.includes(value);
  });

// 체크박스 필터 컴포넌트
const SelectColumnFilter: FC<SelectColumnFilterProps> =
  function SelectColumnFilter({ column: { setFilter, preFilteredRows, id } }) {
    const options: FilterValue[] = useMemo(() => {
      const optionArray: OptionType[] = [];
      preFilteredRows?.forEach((row: Row) => {
        const rowValue = row.values[id];
        const option =
          typeof rowValue === 'object'
            ? rowValue.props.option
            : { name: rowValue, value: rowValue };
        const optionFindIndex = optionArray.findIndex(
          (optionItem: OptionType) =>
            JSON.stringify(optionItem) === JSON.stringify(option),
        );
        if (optionFindIndex < 0) optionArray.push(option);
      });
      return optionArray;
    }, [id, preFilteredRows]);

    return <Checkbox optionList={options} setFilter={setFilter} />;
  };

export { SelectColumnFilter, FilterIncludes };
