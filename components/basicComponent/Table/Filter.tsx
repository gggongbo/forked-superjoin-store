import { Row, FilterValue } from 'react-table';
// import styled from 'styled-components';
import { FC, useMemo } from 'react';

// Define a default UI for filtering
// function DefaultColumnFilter({
//   column: { filterValue, preFilteredRows, setFilter },
// }) {
//   const count = preFilteredRows.length;

//   return (
//     <input
//       value={filterValue || ''}
//       onChange={e => {
//         setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
//       }}
//       placeholder={`Search ${count} records...`}
//     />
//   );
// }

interface SelectColumnFilterProps {
  column: {
    filterValue: FilterValue;
    // eslint-disable-next-line no-unused-vars
    setFilter: (props: FilterValue) => void;
    preFilteredRows: Row[];
    id: number;
  };
}

const SelectColumnFilter: FC<SelectColumnFilterProps> =
  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options: FilterValue[] = useMemo(() => {
      const newOptions = new Set();
      preFilteredRows.forEach(row => {
        newOptions.add(row.values[id]);
      });
      return Array.from(newOptions.values());
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
      <select
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

export default SelectColumnFilter;
