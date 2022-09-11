import type { NextPage } from 'next';
import styled from 'styled-components';
import Table from '@components/basicComponent/Table';
import { useMemo, useCallback, useState, useEffect } from 'react';
import { getFormattedDate, getFormattedTime } from '@utils/dateUtils';
import { useTableComponent } from '@hooks/useTableComponent';
import { OfferProps, Store } from '~/types/offer';
import { useReactQuery } from '~/hooks/useReactQuery';
import { useSelector } from 'react-redux';

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
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [initData, setInitData] = useState([]);
  const pageSizeList = [10, 25, 50, 75, 100];
  const uid = useSelector<Store>(storeInfo => storeInfo.user.currentUser.uid);

  const {
    getFetchedData,
    callTitleComponent,
    callStatusComponent,
    callEndTimeComponent,
    callButtonComponent,
    callDeleteButtonComponent,
    renderRowSubComponent,
  } = useTableComponent();

  useReactQuery('getSendOffer', uid as string, setInitData);

  useEffect(() => {
    if (tableData) setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, [tableData]);

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
          const { category, title, callSendTime, callEndTime, status, callId } =
            filterData;

          filterData.title =
            typeof callSendTime === 'object'
              ? title
              : callTitleComponent(category, title);
          filterData.callSendTime =
            typeof callSendTime === 'object'
              ? `${getFormattedDate(callSendTime, true)}
            ${getFormattedTime(callSendTime, true)}`
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
    </SendOfferBlock>
  );
};

SendOffer.defaultProps = {
  search: { type: '', value: '' },
  type: '',
};

export default SendOffer;
