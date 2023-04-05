import { FirebaseTimestamp } from '@constants/types/common';
import { SearchType } from '@constants/types/components';

export interface RewardProps {
  search?: SearchType;
  columns: any;
}

export type RewardInfo = {
  id: string;
  name: string;
};

export type RewardType = {
  id: string;
  name: string;
  storeId: string;
  createdAt: Date | FirebaseTimestamp;
  updatedAt: Date | FirebaseTimestamp;
  deleted: boolean;
};

export type RewardItemType = {
  item: RewardInfo;
  index: number;
};
