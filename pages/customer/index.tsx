import type { NextPage } from 'next';
import { useMemo, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

import ConfirmedCustomer from './ConfirmedCustomer';
import ExpectedCustomer from './ExpectedCustomer';

import Divider from '@components/basicComponent/Divider';
import Header from '@components/basicComponent/Header';
import SelectInputText from '@components/basicComponent/SelectInputText';
import * as Columns from '@constants/tableColumns';
import { SearchType } from '@constants/types/components';

const optionList = [
  { name: 'ID', value: 'id' },
  { name: '닉네임', value: 'nickname' },
];

const CustomerBlock = styled.main`
  min-width: ${({ theme }) => theme.componentSizes.table.width}px;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.componentSizes.pagePadding}px;
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderText = styled.div<{ customerType: string; defaultValue: string }>`
  display: flex;
  font-size: 24px;
  letter-spacing: -0.55px;
  font-weight: ${props => props.customerType === props.defaultValue && 500};
  color: ${props =>
    props.customerType === props.defaultValue
      ? props.theme.colors.text[600]
      : props.theme.colors.text[200]};
`;

const HeaderDivider = styled(Divider)`
  margin: 0px 20px 0px 20px;
  height: 24px;
  border-color: ${props => props.theme.colors.gray[600]};
`;

const HeaderRightBlock = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const Customer: NextPage = function Customer() {
  const [customerType, setCustomerType] = useState<'expected' | 'confirmed'>(
    'confirmed',
  );
  const [input, setInput] = useState<SearchType>();
  const [search, setSearch] = useState<SearchType>();

  useEffect(() => {
    setSearch(undefined);
  }, [customerType]);

  const handleInputChange = useCallback((e: any) => {
    setInput(e.target.valueObject);
  }, []);

  const headerLeftComponent = useMemo(() => {
    return (
      <HeaderBlock>
        <HeaderText
          onClick={() => setCustomerType('confirmed')}
          customerType={customerType}
          defaultValue="confirmed"
        >
          방문 고객 관리
        </HeaderText>
        <HeaderDivider isVertical />
      </HeaderBlock>
    );
  }, [customerType]);

  const headertitleComponent = useMemo(() => {
    return (
      <HeaderBlock>
        <HeaderText
          onClick={() => setCustomerType('expected')}
          customerType={customerType}
          defaultValue="expected"
        >
          방문 예약 고객 관리
        </HeaderText>
      </HeaderBlock>
    );
  }, [customerType]);

  const headerRightComponent = useMemo(() => {
    return (
      <HeaderRightBlock>
        <SelectInputText
          optionList={optionList}
          onChange={handleInputChange}
          onClick={() => {
            setSearch(input);
          }}
        />
      </HeaderRightBlock>
    );
  }, [input, handleInputChange]);

  return (
    <CustomerBlock>
      <Header
        titleComponent={headertitleComponent}
        leftComponent={headerLeftComponent}
        rightComponent={headerRightComponent}
      />
      {customerType === 'confirmed' ? (
        <ConfirmedCustomer
          columns={Columns.ConfirmedCustomer}
          search={search}
        />
      ) : (
        <ExpectedCustomer columns={Columns.ExpectedCustomer} search={search} />
      )}
    </CustomerBlock>
  );
};

export default Customer;
