import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { NextPage } from 'next';
import { useEffect, useMemo, useCallback, useState } from 'react';
import styled from 'styled-components';

import Table from '@components/basicComponent/Table';
import { useTableComponent } from '@hooks/useTableComponent';
import { RewardProps } from '~/constants/types/reward';

const ConfirmedRewardBlock = styled.main`
  display: flex;
  flex-direction: column;
`;

const TableBlock = styled.div`
  margin-top: 24px;
  width: 100%;
`;

const ConfirmedReward: NextPage<RewardProps> = function ConfirmedReward({
  columns,
  search,
}) {
  const [tableData, setTableData] = useState<any>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const pageSizeList = [10, 25, 50, 75, 100];
  const { getFetchedData, rewardComponent } = useTableComponent();

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
        rewardTime: new Date(2023, 4, 10),
        reward: 200,
      },
      {
        id: 2,
        nickname: 'bbtest',
        rewardTime: new Date(2023, 3, 30),
        reward: 100,
      },
      {
        id: 3,
        nickname: 'ccctest',
        rewardTime: new Date(2023, 4, 2),
        reward: 100,
      },
      {
        id: 4,
        nickname: 'dddtest',
        rewardTime: new Date(),
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
          const { rewardTime, reward } = data;
          return {
            ...data,
            rewardTime: rewardTime
              ? format(rewardTime, 'yyyy년 M월 d일 / a h:mm', { locale: ko })
              : null,
            reward: rewardComponent(true, reward),
          };
        })
        ?.filter((data: any) => {
          if (!search || !search?.type || !search.value) return true;
          const searchType = search?.type || '';
          const searchValue = search?.value || '';
          const dataValue = data[searchType];
          return searchValue?.toString() === dataValue?.toString();
        }),
    [rewardComponent, search, testData],
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
    <ConfirmedRewardBlock>
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
    </ConfirmedRewardBlock>
  );
};

ConfirmedReward.defaultProps = {
  search: { type: '', value: '' },
};

export default ConfirmedReward;
