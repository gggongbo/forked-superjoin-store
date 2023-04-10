import { differenceInMinutes, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import _ from 'lodash';
import type { NextPage } from 'next';
import { useMemo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Table from '@components/basicComponent/Table';
import { callKeys } from '@constants/queryKeys';
import { CallProps, CallType, CommentType } from '@constants/types/call';
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
  const [initData, setInitData] = useState<CallType[]>([]);
  const pageSizeList = [10, 25, 50, 75, 100];

  const {
    getFetchedData,
    callCategoryTitleComponent,
    callHostInfoComponent,
    callEndTimeComponent,
    callStatusComponent,
    appealStatusComponent,
    renderRowSubComponent,
  } = useTableComponent();

  const fetchReceiveCall = useCallback((callData: CallType[]) => {
    if (!callData) return;
    setInitData(callData);
  }, []);

  useReactQuery(
    callKeys.getReceiveCall(currentStoreUser?.location),
    () => {
      if (
        !currentStoreUser ||
        !currentStoreUser?.location ||
        !currentStoreUser?.category
      )
        return null;
      return callService.getReceiveCall({
        location: currentStoreUser?.location,
        mainCategory: currentStoreUser?.category,
      });
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    (resultData: CallType[]) => fetchReceiveCall(resultData),
  );

  const filteredData = useMemo(
    () =>
      initData &&
      initData
        ?.map((data: CallType) => {
          if (!data) return null;
          const {
            callHost,
            category,
            mainCategory,
            title,
            createdAt,
            deadline,
            status,
            commentList,
          } = data;

          const now = new Date();

          const callStatus =
            status === 'proceeding' && deadline <= now ? 'expired' : status;

          const comment = commentList?.find(
            (commentItem: CommentType) =>
              commentItem.storeInfo.id === currentStoreUser?.id,
          );
          return {
            ...data,
            storeInfo: {
              id: currentStoreUser?.id,
              name: currentStoreUser?.name,
              image: currentStoreUser?.image || '',
              address: currentStoreUser?.address,
              location: {
                latitude: currentStoreUser?.location.latitude,
                longitude: currentStoreUser?.location.longitude,
              },
            },
            callTitle: callCategoryTitleComponent(
              title,
              mainCategory || category,
            ),
            callSendUser: callHostInfoComponent(callHost),
            callReceiveTime: createdAt
              ? format(createdAt as Date, 'yyyy년 M월 d일 / a h:mm', {
                  locale: ko,
                })
              : null,
            callEndTime: deadline
              ? callEndTimeComponent(
                  differenceInMinutes(deadline as Date, now),
                  callStatus,
                )
              : null,
            callStatus: callStatusComponent(callStatus),
            appealStatus: appealStatusComponent(comment, callStatus),
          };
        })
        ?.filter((data: any) => {
          if (!search || !search?.type || !search.value) return true;
          const searchType = !_.isArray(search?.type)
            ? search?.type || ''
            : search?.type[0];
          const searchValue = search?.value || '';
          const dataValue = !_.isArray(search?.type)
            ? data[searchType]
            : data[searchType][search?.type[1]];
          return searchValue?.toString() === dataValue?.toString();
        }),
    [
      initData,
      currentStoreUser?.id,
      currentStoreUser?.name,
      currentStoreUser?.image,
      currentStoreUser?.address,
      currentStoreUser?.location.latitude,
      currentStoreUser?.location.longitude,
      callCategoryTitleComponent,
      callHostInfoComponent,
      callEndTimeComponent,
      callStatusComponent,
      appealStatusComponent,
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
      {!!initData && (
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
