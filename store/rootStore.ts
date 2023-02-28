import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import logger from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from '@slices/auth';
import storeUser from '@slices/storeUser';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth', 'storeUser'],
};
const storeUserPersistConfig = {
  key: 'storeUser',
  storage,
  blacklist: [],
};
const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: [],
};

const appReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  storeUser: persistReducer(storeUserPersistConfig, storeUser),
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
