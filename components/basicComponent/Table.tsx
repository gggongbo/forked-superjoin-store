/* eslint-disable react/jsx-props-no-spreading */
import { useTable, useFilters, useSortBy } from 'react-table';
import styled from 'styled-components';
import { FC } from 'react';

interface TableProps {
  columns: any;
  data: any;
}

const TableBlock = styled.table``;

const HeadBlock = styled.thead``;
const HeadRowBlock = styled.tr``;
const HeadColumnBlock = styled.th``;

const BodyBlock = styled.tbody``;
const BodyRowBlock = styled.tr``;
const BodyColumnBlock = styled.td``;

const Table: FC<TableProps> = function Table(props) {
  const { columns, data } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // setFilter,
  } = useTable({ columns, data }, useFilters, useSortBy);

  return (
    <TableBlock {...getTableProps()}>
      <HeadBlock>
        {headerGroups.map(headerGroup => (
          <HeadRowBlock {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              //   <th {...column.getHeaderProps(column.getSortByToggleProps())}>
              <HeadColumnBlock {...column.getHeaderProps()}>
                {column.render('Header')}
              </HeadColumnBlock>
            ))}
          </HeadRowBlock>
        ))}
      </HeadBlock>
      <BodyBlock {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <BodyRowBlock {...row.getRowProps()}>
              {row.cells.map(cell => {
                console.log('cell', cell);
                return (
                  <BodyColumnBlock {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </BodyColumnBlock>
                );
              })}
            </BodyRowBlock>
          );
        })}
      </BodyBlock>
    </TableBlock>
  );
};

export default Table;
