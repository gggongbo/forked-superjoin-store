import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { NextPage } from 'next';
import { useEffect, useMemo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Table from '@components/basicComponent/Table';
import { CustomerProps } from '@constants/types/customer';
import { useTableComponent } from '@hooks/useTableComponent';
import { CurrentStoreUserType, ReduxStoreType } from '~/constants/types/redux';

const ExpectedCustomerBlock = styled.main`
  display: flex;
  flex-direction: column;
`;

const TableBlock = styled.div`
  margin-top: 24px;
  width: 100%;
`;

const ExpectedCustomer: NextPage<CustomerProps> = function ExpectedCustomer({
  columns,
  search,
}) {
  const [tableData, setTableData] = useState<any>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const pageSizeList = [10, 25, 50, 75, 100];
  const { getFetchedData, rewardComponent, visitButtonComponent } =
    useTableComponent();
  const currentStoreUser = useSelector<ReduxStoreType, CurrentStoreUserType>(
    ({ storeUser }) => storeUser?.currentStoreUser,
  );

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
        reserveTime: new Date(2023, 4, 10),
        reward: 200,
      },
      {
        id: 2,
        nickname: 'bbtest',
        reserveTime: new Date(2023, 3, 30),
        reward: 100,
      },
      {
        id: 3,
        nickname: 'ccctest',
        reserveTime: new Date(2023, 4, 2),
        reward: 100,
      },
      {
        id: 4,
        nickname: 'dddtest',
        reserveTime: new Date(),
        reward: 200,
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
          const { id, reserveTime, reward } = data;
          return {
            ...data,
            reserveTime: reserveTime
              ? format(reserveTime, 'yyyy년 M월 d일 / a h:mm', { locale: ko })
              : null,
            reward: rewardComponent(false, reward),
            visit: visitButtonComponent(id, currentStoreUser),
          };
        })
        ?.filter((data: any) => {
          if (!search || !search?.type || !search.value) return true;
          const searchType = search?.type || '';
          const searchValue = search?.value || '';
          const dataValue = data[searchType];
          return searchValue?.toString() === dataValue?.toString();
        }),
    [currentStoreUser, rewardComponent, search, testData, visitButtonComponent],
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
    <ExpectedCustomerBlock>
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
    </ExpectedCustomerBlock>
  );
};

ExpectedCustomer.defaultProps = {
  search: { type: '', value: '' },
};

export default ExpectedCustomer;
