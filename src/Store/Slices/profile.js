import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

const profileSlice = createSlice({
  name: "profile-slice",
  initialState,
  reducers: {
    updateProfileInfo: (state, { payload }) => {
      state.info = { ...state, ...payload };
    },
  },
});

const profileReducer = profileSlice.reducer;

export default profileReducer;

export const { updateProfileInfo } = profileSlice.actions;
