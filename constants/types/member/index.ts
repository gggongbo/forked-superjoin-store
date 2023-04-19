import { NextRouter } from 'next/router';

import { CallInfo, CallMemberType, StoreInfo } from '@constants/types/call';
import { FirebaseTimestamp } from '@constants/types/common';
import { SearchType } from '@constants/types/components';
import { RewardInfo } from '@constants/types/reward';

export type UpdateReservationMemberParamType = {
  callId: string | undefined;
  userId: string | undefined;
};

export type CallsOfUserType = {
  userInfo: CallMemberType;
  storeInfo: StoreInfo;
  callInfo: CallInfo;
  deleted: boolean; // 초기값은 false
  visitedAt: Date | FirebaseTimestamp | string; // 방문 확정 일자. 초기값은 'none'
  confirmedAt: Date | FirebaseTimestamp | string; // 제안 확정 일자. 초기값은 'none'
  canceledAt: Date | FirebaseTimestamp | string; // 제안 취소 일자. 초기값은 'none'
  deadline: Date | FirebaseTimestamp;
  reward: RewardInfo;
};

export type StoresOfUserType = {
  numOfVisit: number;
  numOfConfirm: number;
  numOfCancel: number;
  rewardList: RewardInfo[];
  storeId: string;
  userInfo: CallMemberType;
};

export type MemberRouterType = NextRouter & {
  query: {
    memberType: 'visited' | 'reserved';
  };
};

export interface MemberProps {
  search?: SearchType;
  columns: any;
  initialData: StoresOfUserType[] | CallsOfUserType[];
  fetching: boolean;
  refetch?: Function;
}
