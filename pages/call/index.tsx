import type { GetServerSideProps, NextPage } from 'next';
import withRouter, { WithRouterProps } from 'next/dist/client/with-router';
import { useMemo, useState, useCallback, useEffect } from 'react';
import { dehydrate } from 'react-query';
import styled from 'styled-components';

import ReceiveCall from './ReceiveCall';
import SendCall from './SendCall';

import Divider from '@components/BasicComponent/Divider';
import Header from '@components/BasicComponent/Header';
import InputText from '@components/BasicComponent/InputText';
import SelectInputText from '@components/BasicComponent/SelectInputText';
import Icon from '@components/Icon';
import { callKeys } from '@constants/queryKeys';
import * as Columns from '@constants/tableColumns';
import { CallRouterType, CallType } from '@constants/types/call';
import { SearchType } from '@constants/types/components';
import { useReactQuery } from '@hooks/useReactQuery';
import { callService } from '@services/call';
import queryClient from '@utils/queryUtils';

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

export const getServerSideProps: GetServerSideProps = async () => {
  await Promise.all([
    queryClient.prefetchQuery(
      callKeys.getSendCall,
      () => callService.getSendCall,
    ),
    queryClient.prefetchQuery(
      callKeys.getReceiveCall,
      () => callService.getReceiveCall,
    ),
  ]);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

const Call: NextPage<WithRouterProps> = function Call({ router: routerProps }) {
  const { query } = routerProps as CallRouterType;
  const [callType, setCallType] = useState<'send' | 'receive'>(
    query?.callType || 'send',
  );
  const [input, setInput] = useState<SearchType>();
  const [search, setSearch] = useState<SearchType>();
  const [sendCallList, setSendCallList] = useState<CallType[]>([]);
  const [receiveCallList, setReceiveCallList] = useState<CallType[]>([]);

  useEffect(() => {
    setSearch(undefined);
  }, [callType]);

  const { refetch: getSendCallRefetch, isLoading: isGetSendCallLoading } =
    useReactQuery(
      callKeys.getSendCall,
      () => callService.getSendCall(),
      {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
      },
      (resultData: CallType[]) => {
        if (!resultData) return;
        setSendCallList(resultData);
      },
    );

  const { refetch: getReceiveCallRefetch, isLoading: isGetReceiveCallLoading } =
    useReactQuery(
      callKeys.getReceiveCall,
      () => callService.getReceiveCall(),
      {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
      },
      (resultData: CallType[]) => {
        if (!resultData) return;
        setReceiveCallList(resultData);
      },
    );

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
        <SendCall
          columns={Columns.SendCall}
          search={search}
          type={callType}
          initialData={sendCallList}
          fetching={isGetSendCallLoading}
          refetch={() => {
            getSendCallRefetch();
            getReceiveCallRefetch();
          }}
        />
      ) : (
        <ReceiveCall
          columns={Columns.ReceiveCall}
          search={search}
          type={callType}
          initialData={receiveCallList}
          fetching={isGetReceiveCallLoading}
          refetch={() => {
            getSendCallRefetch();
            getReceiveCallRefetch();
          }}
        />
      )}
    </CallBlock>
  );
};

export default withRouter(Call);
