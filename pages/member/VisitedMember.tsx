import type { NextPage } from 'next';
import { useEffect, useMemo, useCallback, useState } from 'react';
import styled from 'styled-components';

import Table from '@components/BasicComponent/Table';
import { memberKeys } from '@constants/queryKeys';
import { MemberProps, StoresOfUserType } from '@constants/types/member';
import { useReactQuery } from '@hooks/useReactQuery';
import { useTableComponent } from '@hooks/useTableComponent';
import { memberService } from '@services/member';

const VisitedMemberBlock = styled.main`
  display: flex;
  flex-direction: column;
`;

const TableBlock = styled.div`
  margin-top: 24px;
  width: 100%;
`;

const VisitedMember: NextPage<MemberProps> = function VisitedMember({
  columns,
  search,
}) {
  const [tableData, setTableData] = useState<any>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [initData, setInitData] = useState<StoresOfUserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const pageSizeList = [10, 25, 50, 75, 100];
  const { getFetchedData, numOfRewardComponent, textInfoComponent } =
    useTableComponent();

  useEffect(() => {
    if (tableData) setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, [tableData]);

  const fetchVisitedMember = useCallback((memberData: StoresOfUserType[]) => {
    if (!memberData) return;
    setInitData(memberData!);
  }, []);

  const { isLoading } = useReactQuery(
    memberKeys.getVisitedMember,
    () => memberService.getVisitedMember(),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    (resultData: StoresOfUserType[]) => {
      fetchVisitedMember(resultData);
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
            memberId: textInfoComponent(userInfo.id),
            memberName: textInfoComponent(userInfo.name),
            memberNumOfConfirm: `${numOfConfirm || 0}회`,
            memberNumOfCancel: `${numOfCancel || 0}회`,
            memberNumOfVisit: `${numOfVisit || 0}회`,
            memberNumOfReward: numOfRewardComponent(
              rewardList?.length > 0,
              rewardList?.length > 0 ? rewardList.length : 0,
            ),
          };
        })
        ?.filter((data: any) => {
          if (!search || !search?.type || !search.value) return true;
          const searchType =
            search?.type?.indexOf('[') < 0 && search?.type?.indexOf(']') < 0
              ? search?.type || ''
              : JSON.parse(search?.type)[0];
          const searchValue = search?.value || '';
          const dataValue =
            search?.type?.indexOf('[') < 0 && search?.type?.indexOf(']') < 0
              ? data[searchType]
              : data[searchType][JSON.parse(search?.type)[1]];
          return dataValue?.toString()?.includes(searchValue?.toString());
        }),
    [initData, numOfRewardComponent, search, textInfoComponent],
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
    <VisitedMemberBlock>
      {isMounted && (
        <TableBlock>
          <Table
            columns={columns}
            data={tableData}
            loading={loading || isLoading}
            fetchData={fetchData}
            pageSizeList={pageSizeList}
            pageCount={pageCount}
          />
        </TableBlock>
      )}
    </VisitedMemberBlock>
  );
};

VisitedMember.defaultProps = {
  search: { type: '', value: '' },
};

export default VisitedMember;
