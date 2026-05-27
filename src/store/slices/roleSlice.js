import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: null,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
    deleteUserRole: (state) => {
      state.role = null;
    },
  },
});

export const { setUserRole, deleteUserRole } = roleSlice.actions;

export default roleSlice.reducer;
