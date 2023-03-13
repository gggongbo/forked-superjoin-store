import type { NextPage } from 'next';
import { useEffect, useMemo, useCallback, useState } from 'react';
import styled from 'styled-components';

import Table from '@components/basicComponent/Table';
import { CustomerProps } from '@constants/types/customer';
import { useTableComponent } from '@hooks/useTableComponent';

const ConfirmedCustomerBlock = styled.main`
  display: flex;
  flex-direction: column;
`;

const TableBlock = styled.div`
  margin-top: 24px;
  width: 100%;
`;

const ConfirmedCustomer: NextPage<CustomerProps> = function ConfirmedCustomer({
  columns,
  search,
}) {
  const [tableData, setTableData] = useState<any>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const pageSizeList = [10, 25, 50, 75, 100];
  const { getFetchedData, rewardStatusComponent } = useTableComponent();

  useEffect(() => {
    if (tableData) setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, [tableData]);

  const testData = useMemo(
    () => [
      {
        id: 1,
        nickname: 'aatest',
        callCount: 1,
        confirmCount: 5,
        rewardStatus: true,
        reward: 200,
      },
      {
        id: 2,
        nickname: 'bbtest',
        callCount: 2,
        confirmCount: 3,
        rewardStatus: false,
      },
      {
        id: 3,
        nickname: 'ccctest',
        callCount: 5,
        confirmCount: 0,
        rewardStatus: false,
      },
      {
        id: 4,
        nickname: 'dddtest',
        callCount: 1,
        confirmCount: 8,
        rewardStatus: true,
        reward: 100,
      },
    ],
    [],
  );

  const filteredData = useMemo(
    () =>
      testData &&
      testData
        ?.map((data: any) => {
          if (!data) return null;
          const { callCount, confirmCount, rewardStatus, reward } = data;
          return {
            ...data,
            callCount: `${callCount}회`,
            confirmCount: `${confirmCount}회`,
            rewardStatus: rewardStatusComponent(rewardStatus, reward),
          };
        })
        ?.filter((data: any) => {
          if (!search || !search?.type || !search.value) return true;
          const searchType = search?.type || '';
          const searchValue = search?.value || '';
          const dataValue = data[searchType];
          return searchValue?.toString() === dataValue?.toString();
        }),
    [rewardStatusComponent, search, testData],
  );

  const fetchData = useCallback(
    ({ pageSize, pageIndex }: any) => {
      setLoading(true);
      const [getTableData, getPageCount] = getFetchedData(
        pageSize,
        pageIndex,
        filteredData,
      );
      setTableData(getTableData);
      setPageCount(getPageCount);
      setLoading(false);
    },
    [filteredData, getFetchedData],
  );

  return (
    <ConfirmedCustomerBlock>
      {isMounted && (
        <TableBlock>
          <Table
            columns={columns}
            data={tableData}
            loading={loading}
            fetchData={fetchData}
            pageSizeList={pageSizeList}
            pageCount={pageCount}
          />
        </TableBlock>
      )}
    </ConfirmedCustomerBlock>
  );
};

ConfirmedCustomer.defaultProps = {
  search: { type: '', value: '' },
};

export default ConfirmedCustomer;
