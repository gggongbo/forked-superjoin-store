import { SearchType } from '@constants/types/components';

export interface RewardProps {
  search?: SearchType;
  columns: any;
}

export type RewardItemType = {
  item: { id: string | number; value: string };
  index: number;
};
