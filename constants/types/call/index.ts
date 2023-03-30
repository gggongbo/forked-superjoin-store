import { SearchType } from '@constants/types/components';
import { RewardItemType } from '@constants/types/reward';

export interface CallProps {
  columns: any;
  search?: SearchType;
  type?: string;
}

export type CreateCallType = {
  title: string;
  category: string;
  description: string;
  userNum: number;
  deadline: Date;
  reward: RewardItemType;
  email: string | null;
  storeInfo?: object;
};
