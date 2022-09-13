import { Search } from '../basicComponent';

export interface OfferProps {
  columns: any;
  search?: Search;
  type?: string;
  data: Array<object>;
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

export interface Store {
  user: {
    currentUser: {
      uid: string;
      location: {
        longitude: number;
        latitude: number;
        geohash: string;
      };
    };
  };
}
