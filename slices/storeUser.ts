import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  currentStoreUser: {},
};

/* eslint-disable no-param-reassign */
const storeUserSlice = createSlice({
  name: 'storeUser',
  initialState,
  reducers: {
    setCurrentStoreUser: (state, action: PayloadAction<object>) => {
      state.currentStoreUser = action.payload;
    },
  },
});

export const storeUserActions = storeUserSlice.actions;

export default storeUserSlice.reducer;
