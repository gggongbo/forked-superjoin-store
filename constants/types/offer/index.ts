import { SearchType } from '@constants/types/components';

export interface OfferProps {
  columns: any;
  search?: SearchType;
  type?: string;
}

export type MakeOfferType = {
  title: string;
  category: string;
  description: string;
  userNum: number;
  deadline: number;
  reward: number;
  email: string | null;
  storeInfo?: object;
};
