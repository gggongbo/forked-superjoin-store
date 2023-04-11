import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { NextPage } from 'next';
import { useEffect, useMemo, useCallback, useState } from 'react';
import styled from 'styled-components';

import Table from '@components/basicComponent/Table';
import { memberKeys } from '@constants/queryKeys';
import {
  CallsOfUserType,
  MemberProps,
  UpdateReservationMemberParamType,
} from '@constants/types/member';
import { useConfirm } from '@hooks/useConfirm';
import { useReactMutation } from '@hooks/useReactMutation';
import { useReactQuery } from '@hooks/useReactQuery';
import { useTableComponent } from '@hooks/useTableComponent';
import { memberService } from '@services/member';

const ReservedMemberBlock = styled.main`
  display: flex;
  flex-direction: column;
`;

const TableBlock = styled.div`
  margin-top: 24px;
  width: 100%;
`;

const ReservedMember: NextPage<MemberProps> = function ReservedMember({
  columns,
  search,
}) {
  const [tableData, setTableData] = useState<any>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [initData, setInitData] = useState<CallsOfUserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const pageSizeList = [10, 25, 50, 75, 100];
  const {
    getFetchedData,
    textInfoComponent,
    rewardComponent,
    visitButtonComponent,
  } = useTableComponent();
  const { confirm } = useConfirm();

  useEffect(() => {
    if (tableData) setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, [tableData]);

  const fetchReservedMember = useCallback((memberData: CallsOfUserType[]) => {
    if (!memberData) return;
    setInitData(memberData!);
  }, []);

  const { refetch, isLoading: isGetLoading } = useReactQuery(
    memberKeys.getReservedMember,
    () => memberService.getReservedMember(),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    (resultData: CallsOfUserType[]) => {
      fetchReservedMember(resultData);
    },
  );

  const { mutate: visitMutate, isLoading: isVisitLoading } =
    useReactMutation<UpdateReservationMemberParamType>(
      memberKeys.updateReservationMember,
      memberService.updateReservationMember,
      () => {
        refetch();
      },
      () => {
        alert('방문 확인하는 도중 오류가 발생하였습니다.');
      },
    );

  const filteredData = useMemo(
    () =>
      initData &&
      initData
        ?.map((data: CallsOfUserType) => {
          if (!data) return null;
          const { userInfo, callInfo, deadline, reward, canceledAt } = data;
          return {
            ...data,
            memberId: textInfoComponent(userInfo.id),
            memberName: textInfoComponent(userInfo.name),
            callTitle: textInfoComponent(callInfo.title),
            reserveTime: deadline
              ? format(deadline as Date, 'yyyy년 M월 d일 / a h:mm', {
                  locale: ko,
                })
              : null,
            reward: rewardComponent(!!reward, reward),
            visit: visitButtonComponent(
              canceledAt !== 'none',
              isVisitLoading,
              () => {
                confirm('방문 확인하시겠습니까?', () =>
                  visitMutate({
                    callId: callInfo.id,
                    userId: userInfo.id,
                  }),
                );
              },
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
    [
      confirm,
      initData,
      isVisitLoading,
      rewardComponent,
      search,
      textInfoComponent,
      visitButtonComponent,
      visitMutate,
    ],
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
    <ReservedMemberBlock>
      {isMounted && (
        <TableBlock>
          <Table
            columns={columns}
            data={tableData}
            loading={loading || isGetLoading}
            fetchData={fetchData}
            pageSizeList={pageSizeList}
            pageCount={pageCount}
          />
        </TableBlock>
      )}
    </ReservedMemberBlock>
  );
};

ReservedMember.defaultProps = {
  search: { type: '', value: '' },
};

export default ReservedMember;
