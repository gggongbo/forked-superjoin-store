import { format, differenceInMinutes } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { NextPage } from 'next';
import { useMemo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Table from '@components/basicComponent/Table';
import { callKeys } from '@constants/queryKeys';
import { CallProps, ConfirmCallParamType } from '@constants/types/call';
import { CurrentStoreUserType, ReduxStoreType } from '@constants/types/redux';
import { useConfirm } from '@hooks/useConfirm';
import { useReactMutation } from '@hooks/useReactMutation';
import { useReactQuery } from '@hooks/useReactQuery';
import { useTableComponent } from '@hooks/useTableComponent';
import { callService } from '@services/call';

const SendCallBlock = styled.main`
  display: flex;
  flex-direction: column;
`;

const TableBlock = styled.div`
  margin-top: 24px;
  width: 100%;
`;

// TODO : getServerSideProps + react-query prefetch+dehydrate + serverside redux store approaching logic add
const SendCall: NextPage<CallProps> = function SendCall(props) {
  const { columns, search, type } = props;
  const currentStoreUser = useSelector<ReduxStoreType, CurrentStoreUserType>(
    ({ storeUser }) => storeUser?.currentStoreUser,
  );
  const { confirm } = useConfirm();

  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [initData, setInitData] = useState([]);
  const pageSizeList = [10, 25, 50, 75, 100];

  const {
    getFetchedData,
    callTitleComponent,
    callStatusComponent,
    callEndTimeComponent,
    callButtonComponent,
    callDeleteButtonComponent,
    renderRowSubComponent,
  } = useTableComponent();

  const fetchSendCall = useCallback((callData: any) => {
    if (!callData) return;
    setInitData(callData);
  }, []);

  const { refetch } = useReactQuery(
    callKeys.getSendCall(currentStoreUser?.id),
    () => callService.getSendCall(currentStoreUser?.id),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    (resultData: any) => {
      fetchSendCall(resultData);
    },
  );

  const { mutate: confirmMutate } = useReactMutation<ConfirmCallParamType>(
    callKeys.confirmCall,
    callService.confirmCall,
    () => {
      refetch();
    },
    () => {
      alert('제안을 확정하는 도중 오류가 발생하였습니다.');
    },
  );

  const { mutate: cancelMutate } = useReactMutation<string>(
    callKeys.cancelCall,
    callService.cancelCall,
    () => {
      refetch();
    },
    () => {
      alert('제안을 취소하는 도중 오류가 발생하였습니다.');
    },
  );

  const { mutate: deleteMutate } = useReactMutation<string>(
    callKeys.deleteCall,
    callService.deleteCall,
    () => {
      refetch();
    },
    () => {
      alert('제안을 삭제하는 도중 오류가 발생하였습니다.');
    },
  );

  const filteredData = useMemo(
    () =>
      initData &&
      initData
        ?.map((data: any) => {
          const {
            callHost,
            category,
            title,
            deadline,
            status,
            callId,
            createdAt,
            isUserMax,
          } = data;

          const now = new Date();
          let callStatus = null;
          if (status === 'proceeding' && deadline <= now) {
            callStatus = isUserMax ? 'confirmed' : 'expired';
          } else {
            callStatus = status;
          }

          return {
            ...data,
            refetch,
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
            callSendTime: createdAt
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
            callButton: callButtonComponent(
              data,
              callStatus,
              () => {
                confirm('제안을 확정하시겠습니까?', () =>
                  confirmMutate({
                    callId,
                    storeInfo: callHost,
                  }),
                );
              },
              () => {
                confirm(
                  '제안을 취소하시면 불이익이 있을 수 있습니다.\n제안을 취소하시겠습니까?',
                  () => cancelMutate(callId),
                );
              },
            ),
            deleteButton: callDeleteButtonComponent(
              callStatus === 'proceeding' || callStatus === 'confirmed',
              () => {
                confirm('제안을 삭제하시겠습니까?', () => deleteMutate(callId));
              },
            ),
          };
        })
        .filter((filterData: any) => {
          if (!search || !search?.type || !search.value) {
            return true;
          }
          const searchType = search?.type || '';
          const searchValue = search?.value || '';
          const dataValue = filterData[searchType];
          return searchValue?.toString() === dataValue?.toString();
        }),
    [
      initData,
      refetch,
      currentStoreUser.id,
      currentStoreUser.name,
      currentStoreUser.image,
      currentStoreUser.address,
      currentStoreUser.location.latitude,
      currentStoreUser.location.longitude,
      callTitleComponent,
      callEndTimeComponent,
      callStatusComponent,
      callButtonComponent,
      callDeleteButtonComponent,
      confirm,
      confirmMutate,
      cancelMutate,
      deleteMutate,
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
    <SendCallBlock>
      {!initData ? null : (
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
    </SendCallBlock>
  );
};

SendCall.defaultProps = {
  search: { type: '', value: '' },
  type: '',
};

export default SendCall;
