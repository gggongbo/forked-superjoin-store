import type { NextPage } from 'next';
import styled from 'styled-components';
import Table from '@components/basicComponent/Table';
import { useMemo, useCallback, useState, useRef } from 'react';
import Icon from '@components/Icon';
import {
  SelectColumnFilter,
  FilterIncludes,
} from '@components/basicComponent/Table/Filter';
import { Search } from '~/types/basicComponent';

const OfferBlock = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center; //test setting
  justify-content: center; //test setting
`;

const TableBlock = styled.main`
  margin-top: 24px;
  width: 100%;
`;

interface SendOfferProps {
  search?: Search;
}

const SendOffer: NextPage<SendOfferProps> = function SendOffer(props) {
  const { search } = props;
  const [tableData, setTableData] = useState<any>([]);
  // const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const pageSizeList = [10, 25, 50, 75, 100];

  const testHeader = useMemo(() => {
    return <Icon width={20} height={20} name="Out" />;
  }, []);
  const columns = [
    {
      accessor: 'title',
      Header: testHeader,
      width: 200,
    },
    {
      accessor: 'test2',
      Header: 'test2',
      width: 200,
      disableSortBy: true,
    },
    {
      accessor: 'test3',
      Header: 'test3',
      width: 200,
      Filter: SelectColumnFilter,
      filter: FilterIncludes,
      disableSortBy: true,
    },
  ];

  // 검색어 받아서 데이터 필터링 여기서 진행하면 됨
  const exampleData = useMemo(
    () =>
      [
        { title: testHeader, test2: 1, test3: 5 },
        { title: 2, test3: 1 },
        { title: 3, test3: 1 },
        { title: 4, test3: 1 },
      ].filter((data: any) => {
        if (!search?.type || !search.value) return true;
        const searchType = search?.type || '';
        const searchValue = search?.value || '';
        const dataValue = data[searchType];
        return searchValue.toString() === dataValue.toString();
      }),
    [search, testHeader],
  ); // 객체 넘겨줄 수 있음 이를 변환해주는 로직 추가하기

  const fetchData = useCallback(
    ({ pageSize, pageIndex }: any) => {
      // Give this fetch an ID
      // eslint-disable-next-line no-plusplus
      const fetchId = ++fetchIdRef.current;
      // setLoading(true);

      setTimeout(() => {
        if (fetchId === fetchIdRef.current) {
          const startRow = pageSize * pageIndex;
          const endRow = startRow + pageSize;
          setTableData(exampleData.slice(startRow, endRow));
          setPageCount(Math.ceil(exampleData.length / pageSize));
          // setLoading(false);
        }
      }, 300);
    },
    [exampleData],
  );

  const renderRowSubComponent = useCallback(
    () => (
      <div
        style={{
          width: '100%',
        }}
      >
        test
      </div>
    ),
    [],
  );

  return (
    <OfferBlock>
      <TableBlock>
        <Table
          columns={columns}
          data={tableData}
          expandEnable
          renderRowSubComponent={renderRowSubComponent}
          fetchData={fetchData}
          // loading={loading}
          pageSizeList={pageSizeList}
          pageCount={pageCount}
        />
      </TableBlock>
    </OfferBlock>
  );
};

SendOffer.defaultProps = {
  search: { type: '', value: '' },
};

export default SendOffer;
