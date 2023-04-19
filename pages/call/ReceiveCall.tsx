import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useMemo, useCallback, useState, FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Table from '@components/BasicComponent/Table';
import { callKeys } from '@constants/queryKeys';
import {
  CallProps,
  CallType,
  CommentType,
  RegisterCommentCallParamType,
} from '@constants/types/call';
import { CurrentStoreUserType, ReduxStoreType } from '@constants/types/redux';
import { useReactMutation } from '@hooks/useReactMutation';
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

const ReceiveCall: FC<CallProps> = function ReceiveCall(props) {
  const { columns, search, type, initialData, fetching, refetch } = props;
  const currentStoreUser = useSelector<ReduxStoreType, CurrentStoreUserType>(
    ({ storeUser }) => storeUser?.currentStoreUser,
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>([]);
  const [pageCount, setPageCount] = useState<number>(0);
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

  const { mutate: commentMutate, isLoading: isCommentLoading } =
    useReactMutation<RegisterCommentCallParamType>(
      callKeys.registerCommentCall,
      callService.registerCommentCall,
      () => {
        refetch?.();
      },
    );

  const filteredData = useMemo(
    () =>
      initialData &&
      initialData
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
            commentMutate,
            isCommentLoading,
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
              ? callEndTimeComponent(deadline as Date, now, callStatus)
              : null,
            callStatus: callStatusComponent(callStatus),
            appealStatus: appealStatusComponent(comment, callStatus),
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
      appealStatusComponent,
      callCategoryTitleComponent,
      callEndTimeComponent,
      callHostInfoComponent,
      callStatusComponent,
      commentMutate,
      currentStoreUser?.address,
      currentStoreUser?.id,
      currentStoreUser?.image,
      currentStoreUser?.location.latitude,
      currentStoreUser?.location.longitude,
      currentStoreUser?.name,
      initialData,
      isCommentLoading,
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
    </RecieveCallBlock>
  );
};

export default ReceiveCall;
