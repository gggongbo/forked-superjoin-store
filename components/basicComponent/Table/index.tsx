import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import {
  useTable,
  useExpanded,
  useFilters,
  useSortBy,
  usePagination,
} from 'react-table';
import { Tooltip } from 'react-tooltip';
import styled, { css } from 'styled-components';

import Divider from '@components/basicComponent/Divider';
import IconButton from '@components/basicComponent/IconButton';
import SelectBox from '@components/basicComponent/Selectbox';
import Icon from '@components/Icon';
import { useWindowSize } from '@hooks/useWindowSize';
import { componentSizes } from '@styles/theme/media';

const defaultPageSizeList = [10, 25, 50, 75, 100];
const extraWidth =
  componentSizes.sideNavbar.width + componentSizes.pagePadding * 2;

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
  background-color: ${({ theme }) => theme.colors.gray[200]};
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
  color: ${({ theme }) => theme.colors.text[400]};
`;

const HeadColumnContentBlock = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const HeadColumnTooltipBlock = styled.div`
  margin-left: 10px;
  display: flex;
`;

const HeaderColumnToolTip = styled(Tooltip)`
  position: absolute;
  padding: 2px 8px 2px 8px;
  background-color: ${({ theme }) => theme.colors.green[200]};
  border: 1px solid ${({ theme }) => theme.colors.green[300]};
  border-radius: 4px;
  -webkit-box-shadow: 0px 1px 8px 0px
    ${({ theme }) => `${theme.colors.singletons.realBlack}20`};
  box-shadow: 0px 1px 8px 0px
    ${({ theme }) => `${theme.colors.singletons.realBlack}20`};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text[600]};
`;

const FilterBlock = styled.div`
  display: flex;
  align-items: center;
`;

const tooltipIconStyle = css`
  :hover {
    background-color: ${({ theme }) => theme.colors.singletons.green};
  }
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
  flex-wrap: wrap;
  overflow: hidden;
`;

const BodyColumnBlock = styled.td<{ width?: string | number; flex: boolean }>`
  display: flex;
  flex: ${({ flex }) => (flex ? 1 : 'none')};
  flex-direction: row;
  width: ${({ width }) => width}px;
  height: 44px; //fixed
  padding-left: 20px;
  align-items: center;
  font-size: 14px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text[600]};
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
  color: ${({ theme }) => theme.colors.text[400]};
  margin-right: 12px;
`;

const PageInfoText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text[400]};
  margin-right: 20px;
`;

const DividerBlock = styled.div`
  height: 100%;
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 4px;
  padding-bottom: 4px;
`;

// TODO : pagination fc 분리
// TODO : error <div> cannot appear as a child of <tbody> 처리 방법 확인
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
  const { windowSize } = useWindowSize();

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
    pageOptions,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
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
  /* eslint-disable react/no-array-index-key */
  return (
    <TableBlock>
      {pageSizeList?.length > 0 && (
        <>
          <TableContentBlock {...getTableProps()}>
            <HeadBlock>
              {headerGroups?.map(headerGroup => (
                <HeadRowBlock {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers?.map((column, index) => {
                    return windowSize.width - extraWidth <=
                      componentSizes.table.width &&
                      columns[index]?.fadable ? null : (
                      <HeadColumnBlock
                        {...column.getHeaderProps(
                          column.getSortByToggleProps(),
                        )}
                        width={column.width}
                        flex={index === 0}
                        key={index}
                      >
                        <HeadColumnContentBlock>
                          {column.render('Header')}
                          {columns[index]?.tooltip ? (
                            <HeadColumnTooltipBlock
                              data-tooltip-id={`head-column-tooltip${index}`}
                              data-tooltip-content={columns[index]?.tooltip}
                            >
                              <Icon
                                name="Help"
                                width={16}
                                height={16}
                                customStyle={tooltipIconStyle}
                                color="gray"
                                colorIndex={500}
                              />
                              <HeaderColumnToolTip
                                id={`head-column-tooltip${index}`}
                                place="bottom"
                                offset={4}
                                noArrow
                              />
                            </HeadColumnTooltipBlock>
                          ) : null}
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
                        return windowSize.width - extraWidth <=
                          componentSizes.table.width &&
                          columns[index].fadable ? null : (
                          <BodyColumnBlock
                            {...cell.getCellProps()}
                            width={cell.column.width}
                            flex={index === 0}
                            /* eslint-disable-next-line react/no-array-index-key */
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
                disabled={!pageOptions?.length || tablePageIndex === 0}
              />
              <IconButton
                icon={{ name: 'ChevronRight', width: 18, height: 18 }}
                onClick={() =>
                  setTablePageIndex(prev => (prev ? prev + 1 : pageIndex + 1))
                }
                disabled={
                  !pageOptions?.length ||
                  tablePageIndex === pageOptions.length - 1
                }
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
