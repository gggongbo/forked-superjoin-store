import type { NextPage } from 'next';
import styled from 'styled-components';
import Table from '@components/basicComponent/Table';
import { useEffect, useMemo, useCallback, useState } from 'react';
import { useTableComponent } from '@hooks/useTableComponent';
import { NearCustomerProps } from '~/types/customer';

const NearReceiveCustomerBlock = styled.main`
  display: flex;
  flex-direction: column;
`;

const TableBlock = styled.div`
  margin-top: 24px;
  width: 100%;
`;

const NearReceiveCustomer: NextPage<NearCustomerProps> =
  function NearReceiveCustomer({ columns, search }) {
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
            const { callCount, confirmCount, rewardStatus } = data;
            return {
              ...data,
              callCount: `${callCount}회`,
              confirmCount: `${confirmCount}회`,
              rewardStatus: rewardStatusComponent(rewardStatus),
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
      <NearReceiveCustomerBlock>
        {isMounted && (
          <TableBlock>
            <Table
              columns={columns}
              data={tableData}
              loading={loading}
              expandEnable={false}
              fetchData={fetchData}
              pageSizeList={pageSizeList}
              pageCount={pageCount}
            />
          </TableBlock>
        )}
      </NearReceiveCustomerBlock>
    );
  };

NearReceiveCustomer.defaultProps = {
  search: { type: '', value: '' },
};

export default NearReceiveCustomer;
