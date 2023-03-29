import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { NextPage } from 'next';
import { useMemo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Table from '@components/basicComponent/Table';
import { callKeys } from '@constants/queryKeys';
import { CallProps } from '@constants/types/call';
import { CurrentStoreUserType, ReduxStoreType } from '@constants/types/redux';
import { useReactQuery } from '@hooks/useReactQuery';
import { useTableComponent } from '@hooks/useTableComponent';
import { callService } from '@services/call';
import { ArrayToString } from '@utils/stringUtils';

const SendCallBlock = styled.main`
  display: flex;
  flex-direction: column;
`;

const TableBlock = styled.div`
  margin-top: 24px;
  width: 100%;
`;

const SendCall: NextPage<CallProps> = function SendCall(props) {
  const { columns, search, type } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [initData, setInitData] = useState([]);
  const pageSizeList = [10, 25, 50, 75, 100];
  const currentStoreUser = useSelector<ReduxStoreType, CurrentStoreUserType>(
    ({ storeUser }) => storeUser?.currentStoreUser,
  );

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
    setInitData((prev: any) => {
      if (ArrayToString(prev) !== ArrayToString(callData)) {
        return callData;
      }
      return prev;
    });
  }, []);

  useReactQuery<any>(
    callKeys.getStoreCallList(currentStoreUser?.user?.uid),
    () => callService.getStoreCallList(currentStoreUser?.user?.uid),
    (resultData: any) => fetchSendCall(resultData),
  );

  // const initData = useMemo(
  //   () => [
  //     {
  //       category: 'life',
  //       title: 'test',
  //       address: '대한민국 서울특별시 금천구 독산동',
  //       callId: '2yjNgiHI8jmr6EFoUboX',
  //       callSendTime: new Date(),
  //       callEndTime: 30,
  //       deadline: new Date(),
  //       description: '맛있는 알리오 올리오가 먹고 싶은데 할인 가능할까요~?',
  //       maxNumOfUser: 2,
  //       requestList: [
  //         { userId: '11', userPhoto: 'tt' },
  //         { userId: '22', userPhoto: 'tt' },
  //       ],
  //       reward: 0,
  //       status: 'proceeding',
  //     },
  //     {
  //       category: 'food',
  //       title: 'test',
  //       address: '대한민국 서울특별시 금천구 독산동',
  //       callId: '2yjNgiHI8jmr6EFoUboX',
  //       callSendTime: new Date(),
  //       callEndTime: 30,
  //       deadline: new Date(),
  //       description: '-',
  //       maxNumOfUser: 3,
  //       requestList: [
  //         { userId: '11', userPhoto: 'tt' },
  //         { userId: '22', userPhoto: 'tt' },
  //       ],
  //       reward: 1,
  //       status: 'expired',
  //     },
  //   ],
  //   [],
  // );

  const filteredData = useMemo(
    () =>
      initData &&
      initData
        ?.map((data: any) => {
          const { category, title, callEndTime, status, callId, createdAt } =
            data;
          return {
            ...data,
            title: callTitleComponent(category, title),
            callSendTime: createdAt
              ? format(createdAt, 'yyyy년 M월 d일 / a h:mm', {
                  locale: ko,
                })
              : null,
            callEndTime: callEndTime
              ? callEndTimeComponent(callEndTime, status)
              : null,
            callStatus: callStatusComponent(status),
            callButton: callButtonComponent(status, callId, currentStoreUser),
            deleteButton: callDeleteButtonComponent(
              status,
              callId,
              currentStoreUser?.user?.uid,
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
      callTitleComponent,
      callEndTimeComponent,
      callStatusComponent,
      callButtonComponent,
      currentStoreUser,
      callDeleteButtonComponent,
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
