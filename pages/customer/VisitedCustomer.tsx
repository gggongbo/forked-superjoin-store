import type { NextPage } from 'next';
import { useEffect, useMemo, useCallback, useState } from 'react';
import styled from 'styled-components';

import Table from '@components/basicComponent/Table';
import { customerKeys } from '@constants/queryKeys';
import { CustomerProps, StoresOfUserType } from '@constants/types/customer';
import { useReactQuery } from '@hooks/useReactQuery';
import { useTableComponent } from '@hooks/useTableComponent';
import { customerService } from '@services/customer';

const VisitedCustomerBlock = styled.main`
  display: flex;
  flex-direction: column;
`;

const TableBlock = styled.div`
  margin-top: 24px;
  width: 100%;
`;

const VisitedCustomer: NextPage<CustomerProps> = function VisitedCustomer({
  columns,
  search,
}) {
  const [tableData, setTableData] = useState<any>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [initData, setInitData] = useState<StoresOfUserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const pageSizeList = [10, 25, 50, 75, 100];
  const { getFetchedData, numOfRewardComponent } = useTableComponent();

  useEffect(() => {
    if (tableData) setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, [tableData]);

  const fetchVisitedCustomer = useCallback(
    (customerData: StoresOfUserType[]) => {
      if (!customerData) return;
      setInitData(customerData!);
    },
    [],
  );

  useReactQuery(
    customerKeys.getVisitedCustomer,
    () => customerService.getVisitedCustomer(),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    (resultData: StoresOfUserType[]) => {
      fetchVisitedCustomer(resultData);
    },
  );

  const filteredData = useMemo(
    () =>
      initData &&
      initData
        ?.map((data: StoresOfUserType) => {
          if (!data) return null;
          const {
            userInfo,
            numOfVisit,
            numOfConfirm,
            numOfCancel,
            rewardList,
          } = data;
          return {
            ...data,
            customerId: userInfo.id,
            customerName: userInfo.name,
            customerNumOfConfirm: `${numOfConfirm || 0}회`,
            customerNumOfCancel: `${numOfCancel || 0}회`,
            customerNumOfVisit: `${numOfVisit || 0}회`,
            customerNumOfReward: numOfRewardComponent(
              rewardList?.length > 0,
              rewardList?.length > 0 ? rewardList.length : 0,
            ),
          };
        })
        ?.filter((data: any) => {
          if (!search || !search?.type || !search.value) return true;
          const searchType = search?.type || '';
          const searchValue = search?.value || '';
          const dataValue = data[searchType];
          return searchValue?.toString() === dataValue?.toString();
        }),
    [initData, numOfRewardComponent, search],
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
    <VisitedCustomerBlock>
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
    </VisitedCustomerBlock>
  );
};

VisitedCustomer.defaultProps = {
  search: { type: '', value: '' },
};

export default VisitedCustomer;
