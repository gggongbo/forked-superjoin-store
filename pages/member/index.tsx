import type { GetServerSideProps, NextPage } from 'next';
import withRouter, { WithRouterProps } from 'next/dist/client/with-router';
import { useMemo, useEffect, useState, useCallback } from 'react';
import { dehydrate } from 'react-query';
import styled from 'styled-components';

import ReservedMember from './ReservedMember';
import VisitedMember from './VisitedMember';

import Divider from '@components/BasicComponent/Divider';
import Header from '@components/BasicComponent/Header';
import SelectInputText from '@components/BasicComponent/SelectInputText';
import { memberKeys } from '@constants/queryKeys';
import * as Columns from '@constants/tableColumns';
import { SearchType } from '@constants/types/components';
import {
  CallsOfUserType,
  MemberRouterType,
  StoresOfUserType,
} from '@constants/types/member';
import { useReactQuery } from '@hooks/useReactQuery';
import { memberService } from '@services/member';
import queryClient from '@utils/queryUtils';

const MemberBlock = styled.main`
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

const HeaderText = styled.div<{ memberType: string; defaultValue: string }>`
  display: flex;
  font-size: 24px;
  letter-spacing: -0.55px;
  font-weight: ${props => props.memberType === props.defaultValue && 500};
  color: ${props =>
    props.memberType === props.defaultValue
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

const optionList = [
  { name: 'ID', value: ['userInfo', 'id'] },
  { name: '닉네임', value: ['userInfo', 'name'] },
];

export const getServerSideProps: GetServerSideProps = async () => {
  await Promise.all([
    queryClient.prefetchQuery(
      memberKeys.getVisitedMember,
      () => memberService.getVisitedMember,
    ),
    queryClient.prefetchQuery(
      memberKeys.getReservedMember,
      () => memberService.getReservedMember,
    ),
  ]);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

const Member: NextPage<WithRouterProps> = function Member({
  router: routerProps,
}) {
  const { query } = routerProps as MemberRouterType;
  const [memberType, setMemberType] = useState<'visited' | 'reserved'>(
    query?.memberType || 'visited',
  );
  const [input, setInput] = useState<SearchType>();
  const [search, setSearch] = useState<SearchType>();
  const [visitedMemberList, setVisitedMemberList] = useState<
    StoresOfUserType[]
  >([]);
  const [reservedMemberList, setReservedMemberList] = useState<
    CallsOfUserType[]
  >([]);

  useEffect(() => {
    setSearch(undefined);
  }, [memberType]);

  const {
    refetch: getVisitedMemberRefetch,
    isLoading: isGetVisitedMemberLoading,
  } = useReactQuery(
    memberKeys.getVisitedMember,
    () => memberService.getVisitedMember(),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    (resultData: StoresOfUserType[]) => {
      if (!resultData) return;
      setVisitedMemberList(resultData);
    },
  );

  const {
    refetch: getReservedMemberRefetch,
    isLoading: isGetReservedMemberLoading,
  } = useReactQuery(
    memberKeys.getReservedMember,
    () => memberService.getReservedMember(),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    (resultData: CallsOfUserType[]) => {
      if (!resultData) return;
      setReservedMemberList(resultData);
    },
  );

  const handleInputChange = useCallback((e: any) => {
    setInput(e.target.valueObject);
  }, []);

  const headerLeftComponent = useMemo(() => {
    return (
      <HeaderBlock>
        <HeaderText
          onClick={() => setMemberType('visited')}
          memberType={memberType}
          defaultValue="visited"
        >
          방문 고객 관리
        </HeaderText>
        <HeaderDivider isVertical />
      </HeaderBlock>
    );
  }, [memberType]);

  const headertitleComponent = useMemo(() => {
    return (
      <HeaderBlock>
        <HeaderText
          onClick={() => setMemberType('reserved')}
          memberType={memberType}
          defaultValue="reserved"
        >
          방문 예약 고객 관리
        </HeaderText>
      </HeaderBlock>
    );
  }, [memberType]);

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
    <MemberBlock>
      <Header
        titleComponent={headertitleComponent}
        leftComponent={headerLeftComponent}
        rightComponent={headerRightComponent}
      />
      {memberType === 'visited' ? (
        <VisitedMember
          columns={Columns.VisitedMember}
          search={search}
          initialData={visitedMemberList}
          fetching={isGetVisitedMemberLoading}
        />
      ) : (
        <ReservedMember
          columns={Columns.ReservedMember}
          search={search}
          initialData={reservedMemberList}
          fetching={isGetReservedMemberLoading}
          refetch={() => {
            getReservedMemberRefetch();
            getVisitedMemberRefetch();
          }}
        />
      )}
    </MemberBlock>
  );
};

export default withRouter(Member);
