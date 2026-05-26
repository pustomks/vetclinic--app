import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice";
import tokenSlice from "./slices/tokenSlice";
import favoriteSlice from "./slices/favoriteSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    token: tokenSlice,
    favorite: favoriteSlice,
  },
});
