import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CurrentUserType } from '@constants/types/redux';

const initialState = {
  currentUser: {},
  autoLogin: false,
};

/* eslint-disable no-param-reassign */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUserType>) => {
      state.currentUser = action.payload;
    },
    setAutoLogin: (state, action: PayloadAction<boolean>) => {
      state.autoLogin = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
