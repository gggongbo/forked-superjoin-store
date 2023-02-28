import type { NextPage } from 'next';
import { useMemo, useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Table from '@components/basicComponent/Table';
import { OfferProps } from '@constants/types/offer';
import { ReduxStoreType } from '@constants/types/redux';
import { useTableComponent } from '@hooks/useTableComponent';
import { offerService } from '@service/offer';
import { getFormattedDate, getFormattedTime } from '@utils/dateUtils';
import { firebaseDataToOfferData } from '@utils/offerUtils';
import { ArrayToString } from '@utils/stringUtils';

const SendOfferBlock = styled.main`
  display: flex;
  flex-direction: column;
`;

const TableBlock = styled.div`
  margin-top: 24px;
  width: 100%;
`;

const SendOffer: NextPage<OfferProps> = function SendOffer(props) {
  const { columns, search, type } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [initData, setInitData] = useState([]);
  const pageSizeList = [10, 25, 50, 75, 100];
  const userId = useSelector<ReduxStoreType, string>(
    ({ storeUser }) => storeUser?.currentStoreUser?.user?.id,
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

  const getSedndOffer = useCallback(async () => {
    const sendOfferData = await offerService.getSendOffer(userId);
    if (!sendOfferData) return;
    setInitData((prev: any) => {
      if (ArrayToString(prev) !== ArrayToString(sendOfferData.data)) {
        return firebaseDataToOfferData(sendOfferData.data);
      }
      return prev;
    });
  }, [userId]);

  useEffect(() => {
    getSedndOffer();
  }, [getSedndOffer]);

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

  /* eslint-disable no-param-reassign */
  const filteredData = useMemo(
    () =>
      initData &&
      initData
        ?.map((filterData: any) => {
          const {
            category,
            title,
            callSendTime,
            callEndTime,
            status,
            callId,
            createdAt,
          } = filterData;

          filterData.title =
            typeof title === 'object'
              ? title
              : callTitleComponent(category, title);

          filterData.callSendTime =
            typeof callSendTime === 'object'
              ? `${getFormattedDate(createdAt, true)}
            ${getFormattedTime(createdAt, true)}`
              : callSendTime;
          filterData.callEndTime = callEndTimeComponent(callEndTime, status);
          filterData.callStatus = callStatusComponent(status);
          filterData.callButton = callButtonComponent(status, callId);
          filterData.deleteButton = callDeleteButtonComponent(status, callId);
          return filterData;
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
    <SendOfferBlock>
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
    </SendOfferBlock>
  );
};

SendOffer.defaultProps = {
  search: { type: '', value: '' },
  type: '',
};

export default SendOffer;
