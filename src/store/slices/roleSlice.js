import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: null,
  loaded: false,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.role = action.payload;
      state.loaded = true;
    },
    startRoleLoading: (state) => {
      state.loaded = false;
    },
    deleteUserRole: (state) => {
      state.role = null;
      state.loaded = true;
    },
  },
});

export const { setUserRole, deleteUserRole, startRoleLoading } =
  roleSlice.actions;

export default roleSlice.reducer;
