import type { NextPage } from 'next';
import styled from 'styled-components';
import Table from '@components/basicComponent/Table';
import { useEffect, useMemo, useCallback, useState } from 'react';
import { OfferProps } from '~/types/offer';
import { useTableComponent } from '@hooks/useTableComponent';
import { getFormattedDate, getFormattedTime } from '@utils/dateUtils';

const RecieveOfferBlock = styled.main`
  display: flex;
  flex-direction: column;
`;

const TableBlock = styled.main`
  margin-top: 24px;
  width: 100%;
`;

const ReceiveOffer: NextPage<OfferProps> = function ReceiveOffer(props) {
  const { columns, search, type } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const pageSizeList = [10, 25, 50, 75, 100];

  const {
    getFetchedData,
    callTitleComponent,
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

  const testData = useMemo(
    () => [
      {
        category: 'life',
        title: 'test',
        address: '대한민국 서울특별시 금천구 독산동',
        callId: '2yjNgiHI8jmr6EFoUboX',
        callHost: 'testtest',
        callReceiveTime: new Date(),
        callEndTime: 30,
        deadline: new Date(2022, 9, 8),
        description: '맛있는 알리오 올리오가 먹고 싶은데 할인 가능할까요~?',
        callMemberList: [
          { userId: '11', userPhoto: 'tt' },
          { userId: '22', userPhoto: 'tt' },
        ],
        status: 'proceeding',
        appealContent: '',
        appealAt: null,
      },
      {
        category: 'food',
        title: 'test',
        address: '대한민국 서울특별시 금천구 독산동',
        callId: '2yjNgiHI8jmr6EFoUboX',
        callHost: 'testtest',
        callReceiveTime: new Date(),
        callEndTime: 30,
        deadline: new Date(),
        description: '-',
        maxNumOfUser: 3,
        callMemberList: [
          { userId: '11', userPhoto: 'tt' },
          { userId: '22', userPhoto: 'tt' },
        ],
        status: 'canceled',
        appealContent: 'testtest',
        appealAt: new Date(2022, 9, 7),
      },
    ],
    [],
  );

  /* eslint-disable no-param-reassign */
  const filteredData = useMemo(
    () =>
      testData &&
      testData
        ?.map((data: any) => {
          if (!data) return null;
          const {
            category,
            title,
            callReceiveTime,
            callEndTime,
            status,
            appealContent,
          } = data;
          data.title = callTitleComponent(category, title);
          if (callReceiveTime)
            data.callReceiveTime = `${getFormattedDate(callReceiveTime, true)} /
          ${getFormattedTime(callReceiveTime, true)}`;
          if (callEndTime) data.callEndTime = `${callEndTime}분 후`;
          data.callStatus = callStatusComponent(status);
          data.appealStatus = appealStatusComponent(appealContent, status);

          return data;
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
      callStatusComponent,
      callTitleComponent,
      search,
      testData,
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
    <RecieveOfferBlock>
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
    </RecieveOfferBlock>
  );
};

export default ReceiveOffer;
