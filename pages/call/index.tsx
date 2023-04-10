import type { NextPage } from 'next';
import withRouter, { WithRouterProps } from 'next/dist/client/with-router';
import { useMemo, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

import ReceiveCall from './ReceiveCall';
import SendCall from './SendCall';

import Divider from '@components/basicComponent/Divider';
import Header from '@components/basicComponent/Header';
import InputText from '@components/basicComponent/InputText';
import SelectInputText from '@components/basicComponent/SelectInputText';
import Icon from '@components/Icon';
import * as Columns from '@constants/tableColumns';
import { CallRouterType } from '@constants/types/call';
import { SearchType } from '@constants/types/components';

const CallBlock = styled.main`
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

const HeaderText = styled.div<{ callType: string; defaultValue: string }>`
  display: flex;
  font-size: 24px;
  letter-spacing: -0.55px;
  font-weight: ${({ callType, defaultValue }) =>
    callType === defaultValue && 500};
  color: ${({ theme, callType, defaultValue }) =>
    callType === defaultValue
      ? theme.colors.text[600]
      : theme.colors.text[200]};
`;

const HeaderDivider = styled(Divider)`
  margin: 0 20px;
  height: 24px;
  border-color: ${props => props.theme.colors.gray[600]};
`;

const HeaderRightBlock = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const optionList = [
  { name: '제목', value: 'title' },
  { name: '제안 보낸 사람', value: ['callHost', 'name'] },
];

const Call: NextPage<WithRouterProps> = function Call({ router: routerProps }) {
  const { query } = routerProps as CallRouterType;
  const [callType, setCallType] = useState<'send' | 'receive'>(
    query?.callType || 'send',
  );
  const [input, setInput] = useState<SearchType>();
  const [search, setSearch] = useState<SearchType>();

  useEffect(() => {
    setSearch(undefined);
  }, [callType]);

  const handleInputChange = useCallback((e: any) => {
    setInput(e.target.valueObject);
  }, []);

  const headerLeftComponent = useMemo(() => {
    return (
      <HeaderBlock>
        <HeaderText
          onClick={() => setCallType('send')}
          callType={callType}
          defaultValue="send"
        >
          보낸 제안 관리
        </HeaderText>
        <HeaderDivider isVertical />
      </HeaderBlock>
    );
  }, [callType]);

  const headerRightComponent = useMemo(() => {
    return (
      <HeaderRightBlock>
        {callType === 'send' ? (
          <InputText
            width={280}
            placeholder="제목 검색"
            valueType={optionList[0].value}
            onChange={handleInputChange}
            rightComponent={
              <Icon
                width={20}
                height={20}
                name="Search"
                color="realBlack"
                onClick={() => {
                  setSearch(input);
                }}
              />
            }
          />
        ) : (
          <SelectInputText
            optionList={optionList}
            onChange={handleInputChange}
            onClick={() => {
              setSearch(input);
            }}
          />
        )}
      </HeaderRightBlock>
    );
  }, [callType, handleInputChange, input]);

  const headerTitleComponent = useMemo(() => {
    return (
      <HeaderBlock>
        <HeaderText
          onClick={() => setCallType('receive')}
          callType={callType}
          defaultValue="receive"
        >
          받은 제안 관리
        </HeaderText>
      </HeaderBlock>
    );
  }, [callType]);

  return (
    <CallBlock>
      <Header
        titleComponent={headerTitleComponent}
        leftComponent={headerLeftComponent}
        rightComponent={headerRightComponent}
      />
      {callType === 'send' ? (
        <SendCall columns={Columns.SendCall} search={search} type={callType} />
      ) : (
        <ReceiveCall
          columns={Columns.ReceiveCall}
          search={search}
          type={callType}
        />
      )}
    </CallBlock>
  );
};

export default withRouter(Call);
