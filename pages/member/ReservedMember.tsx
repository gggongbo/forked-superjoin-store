import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useMemo, useCallback, useState, FC } from 'react';
import styled from 'styled-components';

import Table from '@components/BasicComponent/Table';
import { memberKeys } from '@constants/queryKeys';
import {
  CallsOfUserType,
  MemberProps,
  UpdateReservationMemberParamType,
} from '@constants/types/member';
import { useConfirm } from '@hooks/useConfirm';
import { useReactMutation } from '@hooks/useReactMutation';
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

const ReservedMember: FC<MemberProps> = function ReservedMember({
  columns,
  search,
  initialData,
  fetching,
  refetch,
}) {
  const [tableData, setTableData] = useState<any>([]);
  const [pageCount, setPageCount] = useState<number>(0);
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

  const { mutate: visitMutate, isLoading: isVisitLoading } =
    useReactMutation<UpdateReservationMemberParamType>(
      memberKeys.updateReservationMember,
      memberService.updateReservationMember,
      () => {
        refetch?.();
      },
    );

  const filteredData = useMemo(
    () =>
      initialData &&
      (initialData as CallsOfUserType[])
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
    [
      confirm,
      initialData,
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
            loading={loading || fetching}
            fetchData={fetchData}
            pageSizeList={pageSizeList}
            pageCount={pageCount}
          />
        </TableBlock>
      )}
    </ReservedMemberBlock>
  );
};

export default ReservedMember;
