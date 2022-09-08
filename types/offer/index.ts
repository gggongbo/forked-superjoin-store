import { Search } from '../basicComponent';

export interface OfferProps {
  columns: any;
  search?: Search;
  type?: string;
}
export type MakeOffer = {
  title: string;
  category: string;
  deadline: number;
  reward: number;
  userNum: number;
  content: string;
  email: string | null;
  storeInfo?: object;
};
