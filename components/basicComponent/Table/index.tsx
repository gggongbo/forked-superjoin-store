/* eslint-disable react/jsx-props-no-spreading */
import {
  useTable,
  useExpanded,
  // useFilters,
  useGlobalFilter,
  useSortBy,
} from 'react-table';
import styled from 'styled-components';
import { FC } from 'react';
import Icon from '../../Icon';

interface TableProps {
  columns: any;
  data: Object[];
  renderRowSubComponent?: any;
  expandEnable?: boolean;
}

const TableBlock = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const HeadBlock = styled.thead`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray[2]};
`;
const HeadRowBlock = styled.tr`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
`;
const HeadColumnBlock = styled.th<{ width?: string | number; flex: boolean }>`
  display: flex;
  flex: ${({ flex }) => (flex ? 1 : 'none')};
  flex-direction: row;
  width: ${({ width }) => width}px;
  padding: 12px 20px;
  align-items: center;
  border: 1px solid black;
  font-size: 14px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text[4]};
`;

const BodyBlock = styled.tbody``;

const BodyRowBlock = styled.tr`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
`;
const BodyRowWrapper = styled.span``;

const BodyColumnBlock = styled.td<{ width?: string | number; flex: boolean }>`
  display: flex;
  flex: ${({ flex }) => (flex ? 1 : 'none')};
  flex-direction: row;
  width: ${({ width }) => width}px;
  padding: 12px 20px;
  border: 1px solid black;
  align-items: center;
  font-size: 14px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text[6]};
`;
const ExpandedRowBlock = styled.tr<{ isExpanded: boolean }>`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  max-height: ${({ isExpanded }) => (isExpanded ? 1000 : 0)}px;
  transition: max-height
    ${({ isExpanded }) => (isExpanded ? `0.5s ease-in` : `0.25s ease-out`)};
`;
const ExpandedColumnBlock = styled.td<{ isExpanded: boolean }>`
  display: flex;
  flex-basis: 100%;
  padding: 8px 46px 16px 46px;
  background-color: ${({ theme }) => theme.colors.gray[1]};
`;

const ArrowBlock = styled.div<{ isExpanded: boolean }>`
  display: flex;
  transform: rotateZ(${({ isExpanded }) => (isExpanded ? '180deg' : '0deg')});
  transition: transform 0.4s;
  margin-right: 12px;
`;

const Table: FC<TableProps> = function Table(props) {
  const { columns, data, renderRowSubComponent, expandEnable } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // state,
    // setFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, useExpanded);

  return (
    <TableBlock {...getTableProps()}>
      <HeadBlock>
        {headerGroups.map(headerGroup => (
          <HeadRowBlock {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => {
              //   <th {...column.getHeaderProps(column.getSortByToggleProps())}>
              return (
                <HeadColumnBlock
                  {...column.getHeaderProps()}
                  width={column.width}
                  flex={index === 0}
                >
                  {column.render('Header')}
                </HeadColumnBlock>
              );
            })}
          </HeadRowBlock>
        ))}
      </HeadBlock>
      <BodyBlock {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <BodyRowWrapper {...row.getRowProps()}>
              <BodyRowBlock>
                {row.cells.map((cell, index) => {
                  return (
                    <BodyColumnBlock
                      {...cell.getCellProps()}
                      width={cell.column.width}
                      flex={index === 0}
                    >
                      {index === 0 && expandEnable && (
                        <ArrowBlock
                          {...row.getToggleRowExpandedProps()}
                          isExpanded={row.isExpanded}
                        >
                          <Icon name="ChevronDown" width={18} height={18} />
                        </ArrowBlock>
                      )}
                      {cell.render('Cell')}
                    </BodyColumnBlock>
                  );
                })}
              </BodyRowBlock>
              {row.isExpanded ? (
                <ExpandedRowBlock isExpanded={row.isExpanded}>
                  <ExpandedColumnBlock isExpanded={row.isExpanded}>
                    {renderRowSubComponent({ row })}
                  </ExpandedColumnBlock>
                </ExpandedRowBlock>
              ) : null}
            </BodyRowWrapper>
          );
        })}
      </BodyBlock>
    </TableBlock>
  );
};

Table.defaultProps = {
  renderRowSubComponent: () => {},
  expandEnable: false,
};
export default Table;
