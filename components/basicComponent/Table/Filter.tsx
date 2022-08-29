import { Row, FilterValue, Column, IdType } from 'react-table';
import { FC, useMemo } from 'react';
import { Option } from '~/types/basicComponent';
import Checkbox from '../Checkbox';

interface SelectColumnFilterProps {
  column: Column<any> & {
    filterValue: FilterValue;
    setFilter: Function;
    preFilteredRows: Row[];
    id: IdType<any>;
  };
}

// 로우 핉터링 로직
const FilterIncludes = (
  rows: Row[],
  id: IdType<any>,
  filterValue: FilterValue,
) =>
  rows.filter((row: Row) => {
    // value name 따로 관리하고 싶으면 수정 필요
    const rowValue = row.values[id];
    return filterValue.includes(rowValue);
  });

// 체크박스 필터 컴포넌트
const SelectColumnFilter: FC<SelectColumnFilterProps> =
  function SelectColumnFilter({ column: { setFilter, preFilteredRows, id } }) {
    const options: FilterValue[] = useMemo(() => {
      const optionArray: Option[] = [];
      preFilteredRows.forEach((row: Row) => {
        const option = { name: row.values[id], value: row.values[id] };
        const optionFindIndex = optionArray.findIndex(
          (optionItem: Option) =>
            JSON.stringify(optionItem) === JSON.stringify(option),
        );
        if (optionFindIndex < 0) optionArray.push(option);
      });
      return optionArray;
    }, [id, preFilteredRows]);

    return <Checkbox optionList={options} width={100} setFilter={setFilter} />;
  };

export { SelectColumnFilter, FilterIncludes };
