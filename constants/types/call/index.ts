import { NextRouter } from 'next/router';

import { FirebaseTimestamp, StoreType } from '@constants/types/common';
import { SearchType } from '@constants/types/components';
import { RewardInfo, RewardType } from '@constants/types/reward';

export type StoreInfoType = {
  id: string;
  name: string;
  image: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
};
export type CallStatusType =
  | 'proceeding'
  | 'confirmed'
  | 'expired'
  | 'canceled'
  | 'visited';

export type CommentType = {
  storeInfo: StoreInfoType;
  createdAt: Date | FirebaseTimestamp;
  updatedAt: Date | FirebaseTimestamp;
  comment: string;
  confirmed: boolean;
};

export type CallInfo = {
  id: string;
  title: string;
};

export type StoreInfo = {
  id: string;
  name: string;
  image: string;
};

export type CallHostType = {
  id: string;
  name: string;
  image: string;
};

export type CallMemberType = {
  id: string;
  name: string;
  image: string;
};

export type CallType = {
  callId: string;
  title: string;
  deleted: boolean;
  callHostId: string;
  callHost: CallHostType;
  callHostType: 'store' | 'user';
  callMemberIdList: string[];
  callMemberList: CallMemberType[];
  commentList: CommentType[];
  requestMemberList: CallMemberType[];
  requestMemberIdList: string[];
  createdAt: Date | FirebaseTimestamp;
  updatedAt: Date | FirebaseTimestamp;
  deadline: Date | FirebaseTimestamp;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  description: string;
  category: string;
  mainCategory: string;
  visitedNumOfUser: number;
  maxNumOfUser: number;
  status: CallStatusType;
  type: 'store' | 'user';
  reward: RewardType | null;
  isUserMax: boolean;
};

export interface CallProps {
  search?: SearchType;
  columns: any;
  type?: string; // Table>SubRow 구분시 사용
  initialData: CallType[];
  fetching: boolean;
  refetch?: Function;
}

export type CreateCallParamType = {
  title: string | undefined;
  category: string | undefined;
  description: string | undefined;
  maxNumOfUser: number;
  deadline: number;
  reward: RewardInfo | null;
  storeInfo?: Pick<StoreType, 'address' | 'location' | 'name' | 'image'>;
};

export type CreateCallRouterType = NextRouter & {
  query: {
    title: string;
    category: string;
    description: string;
    maxNumOfUser: number;
    reward: string;
  };
};

export type CallRouterType = NextRouter & {
  query: {
    callType: 'send' | 'receive';
  };
};

export type ConfirmCallParamType = {
  callId: string;
  storeInfo: StoreInfo;
};

export type AcceptRequestCallParamType = {
  callInfo: { callId: string; title: string };
  targetMemberList: CallMemberType[];
};

export type RejectRequestCallParamType = {
  callId: string;
  targetMemberIdList: string[];
};

export type RegisterCommentCallParamType = {
  callId: string;
  commentInfo: Pick<CommentType, 'storeInfo' | 'comment'>;
};
