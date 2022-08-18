import type { NextPage } from 'next';
import styled from 'styled-components';
import Table from '@components/basicComponent/Table';
import { useMemo } from 'react';
import Icon from '@components/Icon';

const OfferBlock = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center; //test setting
  justify-content: center; //test setting
`;

const SendOffer: NextPage = function SendOffer() {
  const testHeader = useMemo(() => {
    return <Icon width={20} height={20} name="Out" />;
  }, []);
  const columns = [
    { accessor: 'test', Header: testHeader },
    { accessor: 'test2', Header: 'test2' },
  ];
  const data = [{ test: testHeader, test2: 1 }, { test: 2 }]; // 객체 넘겨줄 수 있음 이를 변환해주는 로직 추가하기
  return (
    <OfferBlock>
      <Table columns={columns} data={data} />
    </OfferBlock>
  );
};

export default SendOffer;
