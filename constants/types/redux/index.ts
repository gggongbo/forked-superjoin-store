import { LocationType } from '@constants/types/common';

export type CurrentUserType = {
  id: string;
  avatar: string | null;
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
};

export type AuthType = {
  auth: {
    currentUser: CurrentUserType;
    autoLogin: boolean;
  };
};

export type CurrentStoreUserType = {
  id: string;
  name: string;
  image: string;
  category: string;
  email: string;
  brandId: string;
  businessNumber: string;
  address: string;
  location: LocationType;
  disabled: boolean;
};

export type StoreUserType = {
  storeUser: {
    currentStoreUser: CurrentStoreUserType;
  };
};
export interface ReduxStoreType extends AuthType, StoreUserType {}
