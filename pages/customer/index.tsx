import type { NextPage } from 'next';
import { useMemo, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

import NearReceiveCustomer from './NearReceiveCustomer';
import NearSendCustomer from './NearSendCustomer';

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
  display: flex;
  flex-direction: column;
  padding: 24px;
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
      ? props.theme.colors.text[6]
      : props.theme.colors.text[2]};
`;

const HeaderDivider = styled(Divider)`
  margin: 0px 20px 0px 20px;
  height: 24px;
  border-color: ${props => props.theme.colors.gray[6]};
`;

const HeaderRightBlock = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const Customer: NextPage = function Customer() {
  const [customerType, setCustomerType] = useState<string>('send');
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
          onClick={() => setCustomerType('send')}
          customerType={customerType}
          defaultValue="send"
        >
          근처 멤버 관리 (보낸 제안)
        </HeaderText>
        <HeaderDivider isVertical />
      </HeaderBlock>
    );
  }, [customerType]);

  const headertitleComponent = useMemo(() => {
    return (
      <HeaderBlock>
        <HeaderText
          onClick={() => setCustomerType('receive')}
          customerType={customerType}
          defaultValue="receive"
        >
          근처 멤버 관리 (받은 제안)
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
      {customerType === 'send' ? (
        <NearSendCustomer columns={Columns.NearCustomer} search={search} />
      ) : (
        <NearReceiveCustomer columns={Columns.NearCustomer} search={search} />
      )}
    </CustomerBlock>
  );
};

export default Customer;
