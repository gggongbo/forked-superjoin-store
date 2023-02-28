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
  };
};

export type CurrentStoreUserType = {
  user: {
    id: string;
  };
  location: {
    longitude: number;
    latitude: number;
    geohash: string;
  };
};

export type StoreUserType = {
  storeUser: {
    currentStoreUser: CurrentStoreUserType;
  };
};
export interface ReduxStoreType extends AuthType, StoreUserType {}
