import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: [],
  reducers: {
    toggleFavouritePet: (state, action) => {
      const pet = action.payload;

      const favoritePetIndex = state.findIndex((item) => item.id === pet.id);

      if (favoritePetIndex !== -1) {
        state.splice(favoritePetIndex, 1);
      } else {
        state.push(pet);
      }
    },

    deleteAllFavorites: (state) => {
      return [];
    },
  },
});

export const { toggleFavouritePet, deleteAllFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;
