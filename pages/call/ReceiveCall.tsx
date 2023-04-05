import { differenceInMinutes, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { NextPage } from 'next';
import { useEffect, useMemo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Table from '@components/basicComponent/Table';
import { callKeys } from '@constants/queryKeys';
import { CallProps, CommentType } from '@constants/types/call';
import { CurrentStoreUserType, ReduxStoreType } from '@constants/types/redux';
import { useReactQuery } from '@hooks/useReactQuery';
import { useTableComponent } from '@hooks/useTableComponent';
import { callService } from '@services/call';

const RecieveCallBlock = styled.main`
  display: flex;
  flex-direction: column;
`;

const TableBlock = styled.main`
  margin-top: 24px;
  width: 100%;
`;

const ReceiveCall: NextPage<CallProps> = function ReceiveCall(props) {
  const { columns, search, type } = props;
  const currentStoreUser = useSelector<ReduxStoreType, CurrentStoreUserType>(
    ({ storeUser }) => storeUser?.currentStoreUser,
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [initData, setInitData] = useState([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const pageSizeList = [10, 25, 50, 75, 100];

  const {
    getFetchedData,
    callTitleComponent,
    callEndTimeComponent,
    callStatusComponent,
    appealStatusComponent,
    renderRowSubComponent,
  } = useTableComponent();

  useEffect(() => {
    if (tableData) setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, [tableData]);

  const fetchReceiveCall = useCallback((callData: any) => {
    if (!callData) return;
    setInitData(callData);
  }, []);

  useReactQuery<any>(
    callKeys.getReceiveCall(currentStoreUser.location),
    () => callService.getReceiveCall(currentStoreUser.location),
    (resultData: any) => fetchReceiveCall(resultData),
  );

  const filteredData = useMemo(
    () =>
      initData &&
      initData
        ?.map((data: any) => {
          if (!data) return null;
          const { category, title, createdAt, deadline, status, commentList } =
            data;

          const now = new Date();

          const callStatus =
            status === 'proceeding' && deadline <= now ? 'expired' : status;

          const comment = commentList?.find(
            (commentItem: CommentType) =>
              commentItem.storeInfo.id === currentStoreUser.id,
          );
          return {
            ...data,
            storeInfo: {
              id: currentStoreUser.id,
              name: currentStoreUser.name,
              image: currentStoreUser.image || '',
              address: currentStoreUser.address,
              location: {
                latitude: currentStoreUser.location.latitude,
                longitude: currentStoreUser.location.longitude,
              },
            },
            callTitle: callTitleComponent(category, title),
            callReceiveTime: createdAt
              ? format(createdAt, 'yyyy년 M월 d일 / a h:mm', {
                  locale: ko,
                })
              : null,
            callEndTime: deadline
              ? callEndTimeComponent(
                  differenceInMinutes(deadline, now),
                  callStatus,
                )
              : null,
            callStatus: callStatusComponent(callStatus),
            appealStatus: appealStatusComponent(comment, callStatus),
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
      appealStatusComponent,
      callEndTimeComponent,
      callStatusComponent,
      callTitleComponent,
      currentStoreUser.address,
      currentStoreUser.id,
      currentStoreUser.image,
      currentStoreUser.location.latitude,
      currentStoreUser.location.longitude,
      currentStoreUser.name,
      initData,
      search,
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
    <RecieveCallBlock>
      {isMounted && (
        <TableBlock>
          <Table
            columns={columns}
            data={tableData}
            expandEnable
            renderRowSubComponent={renderRowSubComponent}
            fetchData={fetchData}
            loading={loading}
            pageSizeList={pageSizeList}
            pageCount={pageCount}
            type={type}
          />
        </TableBlock>
      )}
    </RecieveCallBlock>
  );
};

export default ReceiveCall;
