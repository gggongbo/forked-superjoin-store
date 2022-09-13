import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {},
};

/* eslint-disable no-param-reassign */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<object>) => {
      state.currentUser = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
