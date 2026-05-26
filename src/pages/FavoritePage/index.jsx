import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllFavorites,
  toggleFavouritePet,
} from "../../store/slices/favoriteSlice";

export default function FavoritePage() {
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorite);

  const handleDeleteAll = () => {
    dispatch(deleteAllFavorites());
  };

  return (
    <div>
      <h2>Избранные питомцы</h2>
      {favorite.length > 0 && (
        <button onClick={handleDeleteAll}>Удалить всё</button>
      )}

      {favorite.length === 0 ? (
        <p>Нет избранных питомцев</p>
      ) : (
        favorite.map((pet) => (
          <div key={pet.id}>
            <span>{pet.name}</span>
            <button onClick={() => dispatch(toggleFavouritePet(pet))}>
              Удалить из избранного
            </button>
          </div>
        ))
      )}
    </div>
  );
}
