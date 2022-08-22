import type { NextPage } from 'next';
import styled from 'styled-components';
import Table from '@components/basicComponent/Table';
import { useMemo, useCallback } from 'react';
import Icon from '@components/Icon';

const OfferBlock = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center; //test setting
  justify-content: center; //test setting
`;

const SendOffer: NextPage = function SendOffer() {
  // const call = {
  //   callId: 't',
  //   category: 'food',
  //   // title,
  //   // status,
  //   // requestList,
  //   // callMemberList,
  //   // maxNumoOfUser,
  //   // callHost,
  //   // deadLine,
  //   // address,
  //   // descrption,
  //   // timestamp,
  // };
  const testHeader = useMemo(() => {
    return <Icon width={20} height={20} name="Out" />;
  }, []);
  const columns = [
    { accessor: 'test', Header: testHeader, width: 200 },
    { accessor: 'test2', Header: 'test2', width: 200 },
    { accessor: 'test3', Header: 'test3', width: 200 },
  ];

  const data = [{ test: testHeader, test2: 1, test3: 5 }, { test: 2 }]; // 객체 넘겨줄 수 있음 이를 변환해주는 로직 추가하기

  const renderRowSubComponent = useCallback(
    // ({ row }) => (
    () => (
      <pre
        style={{
          fontSize: '10px',
        }}
      >
        test
        {/* <code>{JSON.stringify({ values: row.values }, null, 2)}</code> */}
      </pre>
    ),
    [],
  );

  return (
    <OfferBlock>
      <Table
        columns={columns}
        data={data}
        expandEnable
        renderRowSubComponent={renderRowSubComponent}
      />
    </OfferBlock>
  );
};

export default SendOffer;
