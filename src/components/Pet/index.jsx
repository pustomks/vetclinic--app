import { useDispatch, useSelector } from "react-redux";
import { toggleFavouritePet } from "../../store/slices/favoriteSlice";
import { Link } from "react-router-dom";

export default function Pet({ pet, setPets, setEditPet }) {
  const { token } = useSelector((state) => state.token);
  const favorite = useSelector((state) => state.favorite);

  const dispatch = useDispatch();
  const deletePet = async (id) => {
    try {
      const response = await fetch(`/api/pets/me/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setPets((previousPets) => previousPets.filter((pet) => pet.id !== id));
        console.log("Pet deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <span>{pet.name}</span>
      <Link to={`/mypets/${pet.id}`}>{pet.name}</Link>
      <button onClick={() => deletePet(pet.id)}>Удалить</button>
      <button onClick={() => setEditPet(pet)}>Изменить</button>
      <button onClick={() => dispatch(toggleFavouritePet(pet))}>
        {favorite.find((item) => item.id === pet.id)
          ? "Удалить из избранного"
          : "В избранное"}
      </button>
    </div>
  );
}
