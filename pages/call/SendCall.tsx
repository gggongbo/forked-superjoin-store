import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useMemo, useCallback, useState, FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Table from '@components/BasicComponent/Table';
import { callKeys } from '@constants/queryKeys';
import {
  AcceptRequestCallParamType,
  CallProps,
  CallStatusType,
  CallType,
  ConfirmCallParamType,
  RejectRequestCallParamType,
} from '@constants/types/call';
import { CurrentStoreUserType, ReduxStoreType } from '@constants/types/redux';
import { useConfirm } from '@hooks/useConfirm';
import { useReactMutation } from '@hooks/useReactMutation';
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

const SendCall: FC<CallProps> = function SendCall(props) {
  const { columns, search, type, initialData, fetching, refetch } = props;
  const currentStoreUser = useSelector<ReduxStoreType, CurrentStoreUserType>(
    ({ storeUser }) => storeUser?.currentStoreUser,
  );
  const { confirm } = useConfirm();

  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const pageSizeList = [10, 25, 50, 75, 100];

  const {
    getFetchedData,
    callCategoryTitleComponent,
    callStatusComponent,
    callEndTimeComponent,
    callButtonComponent,
    callDeleteButtonComponent,
    renderRowSubComponent,
  } = useTableComponent();

  const { mutate: confirmMutate, isLoading: isConfirmLoading } =
    useReactMutation<ConfirmCallParamType>(
      callKeys.confirmCall,
      callService.confirmCall,
      () => {
        refetch?.();
      },
    );

  const { mutate: cancelMutate, isLoading: isCancelLoading } =
    useReactMutation<string>(
      callKeys.cancelCall,
      callService.cancelCall,
      () => {
        refetch?.();
      },
    );

  const { mutate: deleteMutate, isLoading: isDeleteLoading } =
    useReactMutation<string>(
      callKeys.deleteCall,
      callService.deleteCall,
      () => {
        refetch?.();
      },
    );

  const { mutate: acceptMutate, isLoading: isAcceptLoading } =
    useReactMutation<AcceptRequestCallParamType>(
      callKeys.acceptRequestCall,
      callService.acceptRequestCall,
      () => {
        refetch?.();
      },
    );

  const { mutate: rejectMutate, isLoading: isRejectLoading } =
    useReactMutation<RejectRequestCallParamType>(
      callKeys.rejectRequestCall,
      callService.rejectRequestCall,
      () => {
        refetch?.();
      },
    );

  const filteredData = useMemo(
    () =>
      initialData &&
      initialData
        ?.map((data: CallType) => {
          const {
            callHost,
            category,
            mainCategory,
            title,
            deadline,
            status,
            callId,
            createdAt,
            isUserMax,
          } = data;

          const now = new Date();
          let callStatus: CallStatusType = 'proceeding';
          if (status === 'proceeding' && deadline <= now) {
            callStatus = isUserMax ? 'confirmed' : 'expired';
          } else {
            callStatus = status;
          }

          return {
            ...data,
            acceptMutate,
            rejectMutate,
            isConfirmLoading,
            isCancelLoading,
            isDeleteLoading,
            isAcceptLoading,
            isRejectLoading,
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
            callSendTime: createdAt
              ? format(createdAt as Date, 'yyyy년 M월 d일 / a h:mm', {
                  locale: ko,
                })
              : null,
            callEndTime: deadline
              ? callEndTimeComponent(deadline as Date, now, callStatus)
              : null,
            callStatus: callStatusComponent(callStatus),
            callButton: callButtonComponent(
              data,
              callStatus,
              isConfirmLoading ||
                isCancelLoading ||
                isDeleteLoading ||
                isAcceptLoading ||
                isRejectLoading,
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
              isConfirmLoading ||
                isCancelLoading ||
                isDeleteLoading ||
                isAcceptLoading ||
                isRejectLoading,
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
          return dataValue?.toString()?.includes(searchValue?.toString());
        }),
    [
      acceptMutate,
      callButtonComponent,
      callCategoryTitleComponent,
      callDeleteButtonComponent,
      callEndTimeComponent,
      callStatusComponent,
      cancelMutate,
      confirm,
      confirmMutate,
      currentStoreUser?.address,
      currentStoreUser?.id,
      currentStoreUser?.image,
      currentStoreUser?.location.latitude,
      currentStoreUser?.location.longitude,
      currentStoreUser?.name,
      deleteMutate,
      initialData,
      isAcceptLoading,
      isCancelLoading,
      isConfirmLoading,
      isDeleteLoading,
      isRejectLoading,
      rejectMutate,
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
      {!!initialData && (
        <TableBlock>
          <Table
            columns={columns}
            data={tableData}
            expandEnable
            renderRowSubComponent={renderRowSubComponent}
            fetchData={fetchData}
            loading={loading || fetching}
            pageSizeList={pageSizeList}
            pageCount={pageCount}
            type={type}
          />
        </TableBlock>
      )}
    </SendCallBlock>
  );
};

export default SendCall;
