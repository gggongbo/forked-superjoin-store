import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CurrentStoreUserType } from '@constants/types/redux';

const initialState = {
  currentStoreUser: {},
  notificationVisible: false,
  numOfNotification: 0,
};

/* eslint-disable no-param-reassign */
const storeUserSlice = createSlice({
  name: 'storeUser',
  initialState,
  reducers: {
    setCurrentStoreUser: (
      state,
      action: PayloadAction<CurrentStoreUserType>,
    ) => {
      state.currentStoreUser = action.payload;
    },
    setNotificationVisible: (state, action: PayloadAction<boolean>) => {
      state.notificationVisible = action.payload;
    },
    setNumOfNotification: (state, action: PayloadAction<number>) => {
      state.numOfNotification = action.payload;
    },
  },
});

export const storeUserActions = storeUserSlice.actions;

export default storeUserSlice.reducer;
