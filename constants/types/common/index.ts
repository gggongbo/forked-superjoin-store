import { Timestamp } from 'firebase/firestore';

export type StoreType = {
  id: string;
  name: string;
  image: string;
  category: string;
  email: string;
  brandId: string;
  businessNumber: string;
  address: string;
  location: {
    longitude: number;
    latitude: number;
    geohash: string;
  };
  disabled: boolean;
};

export type LocationType = {
  latitude: number;
  longitude: number;
  geohash: string;
};

export type FirebaseTimestamp = Timestamp & {
  _seconds: number;
  _nanoseconds: number;
};
