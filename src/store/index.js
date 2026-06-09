import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./slices/tokenSlice";
import favoriteSlice from "./slices/favoriteSlice";
import roleSlice from "./slices/roleSlice";

export const store = configureStore({
  reducer: {
    token: tokenSlice,
    favorite: favoriteSlice,
    role: roleSlice,
  },
});
