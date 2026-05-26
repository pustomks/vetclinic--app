import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("jwt"),
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("jwt");
    },
  },
});

export const { login, logout } = tokenSlice.actions;

export default tokenSlice.reducer;
