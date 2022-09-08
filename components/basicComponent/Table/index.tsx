import {
  useTable,
  useExpanded,
  useFilters,
  useSortBy,
  usePagination,
} from 'react-table';
import styled, { css } from 'styled-components';
import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import Icon from '../../Icon';
import SelectBox from '../Selectbox';
import Divider from '../Divider';
import IconButton from '../IconButton';

interface TableProps {
  columns: any;
  data: Object[];
  renderRowSubComponent?: any;
  expandEnable?: boolean;
  fetchData: Function;
  pageSizeList?: number[] | undefined;
  loading?: boolean;
  pageCount: number;
  type?: string;
}

const defaultPageSizeList = [10, 25, 50, 75, 100];

const TableBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TableContentBlock = styled.table`
  display: flex;
  flex-direction: column;
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
`;
const HeadColumnBlock = styled.th<{ width?: string | number; flex: boolean }>`
  display: flex;
  flex: ${({ flex }) => (flex ? 1 : 'none')};
  flex-direction: row;
  justify-content: space-between;
  width: ${({ width }) => width}px;
  padding: 12px 0px 12px 20px;
  align-items: center;
  font-size: 14px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text[4]};
`;

const HeadColumnContentBlock = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const FilterBlock = styled.div`
  display: flex;
  align-items: center;
`;
const sortIconStyle = css`
  margin-left: 10px;
  :hover {
    background-color: ${({ theme }) => theme.colors.singletons.green};
  }
`;

const BodyBlock = styled.tbody``;

const BodyRowBlock = styled.tr<{ type?: string }>`
  display: flex;
  flex-direction: row;
`;

const BodyColumnBlock = styled.td<{ width?: string | number; flex: boolean }>`
  display: flex;
  flex: ${({ flex }) => (flex ? 1 : 'none')};
  flex-direction: row;
  width: ${({ width }) => width}px;
  padding: 12px 20px;
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
`;

const ArrowBlock = styled.div<{ isExpanded: boolean }>`
  display: flex;
  transform: rotateZ(${({ isExpanded }) => (isExpanded ? '180deg' : '0deg')});
  transition: transform 0.4s;
  margin-right: 12px;
`;

const PaginationBlock = styled.div`
  margin: 14px 14px 14px 0px;
  display: flex;
  align-self: flex-end;
  flex-direction: row;
  align-items: center;
`;

const PerPageTextBlock = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text[4]};
  margin-right: 12px;
`;

const PageInfoText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text[4]};
  margin-right: 20px;
`;

const DividerBlock = styled.div`
  height: 100%;
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 4px;
  padding-bottom: 4px;
`;

// todo: pagination fc 분리
const Table: FC<TableProps> = function Table(props) {
  const {
    columns,
    data,
    renderRowSubComponent,
    expandEnable,
    fetchData,
    loading,
    pageSizeList = defaultPageSizeList,
    pageCount: pageCountFromServer,
    type,
  } = props;

  const defaultColumn = useMemo(
    () => ({
      Filter: () => null,
    }),
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    // canPreviousPage,
    // canNextPage,
    // pageCount,
    // gotoPage,
    // nextPage,
    // previousPage,
    pageOptions,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      // filter setting
      defaultColumn,
      // pagination setting
      initialState: {
        pageIndex: 0,
        pageSize: pageSizeList[0],
      },
      manualPagination: true,
      pageCount: pageCountFromServer,
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
  );

  const [tablePageIndex, setTablePageIndex] = useState(pageIndex);

  useEffect(() => {
    fetchData({ pageIndex: tablePageIndex, pageSize });
  }, [fetchData, pageSize, tablePageIndex]);

  /* eslint-disable react/jsx-props-no-spreading */
  /* eslint-disable no-nested-ternary */
  /* eslint-disable react/button-has-type */
  return (
    <TableBlock>
      {pageSizeList?.length > 0 && (
        <>
          <TableContentBlock {...getTableProps()}>
            <HeadBlock>
              {headerGroups?.map(headerGroup => (
                <HeadRowBlock {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers?.map((column, index) => {
                    return (
                      <HeadColumnBlock
                        {...column.getHeaderProps(
                          column.getSortByToggleProps(),
                        )}
                        width={column.width}
                        flex={index === 0}
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                      >
                        <HeadColumnContentBlock>
                          {column.render('Header')}
                          {column.canSort ? (
                            <Icon
                              name={
                                column.isSortedDesc ? 'ArrowDown' : 'ArrowUp'
                              }
                              width={16}
                              height={16}
                              customStyle={sortIconStyle}
                              color="realBlack"
                            />
                          ) : null}
                        </HeadColumnContentBlock>
                        <FilterBlock>
                          {column.canFilter ? column.render('Filter') : null}
                        </FilterBlock>
                      </HeadColumnBlock>
                    );
                  })}
                </HeadRowBlock>
              ))}
            </HeadBlock>
            <BodyBlock {...getTableBodyProps()}>
              {page?.map(row => {
                prepareRow(row);
                return (
                  <Fragment key={row.id}>
                    <BodyRowBlock {...row.getRowProps()}>
                      {row.cells?.map((cell, index) => {
                        return (
                          <BodyColumnBlock
                            {...cell.getCellProps()}
                            width={cell.column.width}
                            flex={index === 0}
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                          >
                            {index === 0 && expandEnable && (
                              <ArrowBlock
                                {...row.getToggleRowExpandedProps()}
                                isExpanded={row.isExpanded}
                              >
                                <Icon
                                  name="ChevronDown"
                                  width={18}
                                  height={18}
                                />
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
                          {renderRowSubComponent({ row, type })}
                        </ExpandedColumnBlock>
                      </ExpandedRowBlock>
                    ) : null}
                    <Divider isVertical={false} />
                  </Fragment>
                );
              })}
            </BodyBlock>
          </TableContentBlock>
          {!loading && (
            <PaginationBlock>
              <PerPageTextBlock>Rows per page :</PerPageTextBlock>
              <SelectBox
                defaultOption={{
                  name: pageSize,
                  value: pageSize,
                }}
                optionList={pageSizeList?.map(showPageSize => ({
                  name: showPageSize,
                  value: showPageSize,
                }))}
                width={60}
                customSize="small"
                onChange={e => {
                  setPageSize(Number(e.target.selectValue));
                  setTablePageIndex(0);
                }}
              />
              <DividerBlock>
                <Divider isVertical />
              </DividerBlock>
              <PageInfoText>
                {tablePageIndex === 0
                  ? tablePageIndex + 1
                  : tablePageIndex + pageSize}
                -{(tablePageIndex + 1) * pageSize} of{' '}
                {pageSize * pageOptions.length}
              </PageInfoText>
              <IconButton
                icon={{ name: 'ChevronLeft', width: 18, height: 18 }}
                onClick={() => setTablePageIndex(prev => (prev ? prev - 1 : 0))}
                disabled={tablePageIndex === 0}
              />
              <IconButton
                icon={{ name: 'ChevronRight', width: 18, height: 18 }}
                onClick={() =>
                  setTablePageIndex(prev => (prev ? prev + 1 : pageIndex + 1))
                }
                disabled={tablePageIndex === pageOptions.length - 1}
              />
            </PaginationBlock>
          )}
        </>
      )}
    </TableBlock>
  );
};

Table.defaultProps = {
  renderRowSubComponent: () => {},
  expandEnable: false,
  loading: false,
  pageSizeList: defaultPageSizeList,
  type: '',
};
export default Table;
