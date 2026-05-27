import { useDispatch, useSelector } from "react-redux";
import { toggleFavouritePet } from "../../store/slices/favoriteSlice";
import { Link } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import {
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import styles from "./Pet.module.css";

export default function Pet({ pet, setPets, setEditPet }) {
  const { token } = useSelector((state) => state.token);
  const favorite = useSelector((state) => state.favorite);
  const dispatch = useDispatch();
  const isFavorite = favorite.find((item) => item.id === pet.id);
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
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div className={styles.petContainer}>
        <Link className={styles.petLink} to={`/mypets/${pet.id}`}>
          {pet.name}
        </Link>

        <div className={styles.petButton}>
          <Tooltip title="Delete pet">
            <Button onClick={() => deletePet(pet.id)}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Edit pet">
            <Button onClick={() => setEditPet(pet)}>
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip
            title={
              isFavorite ? "Remove pet from favorites" : "Add pet to favorites"
            }
          >
            <Button onClick={() => dispatch(toggleFavouritePet(pet))}>
              {isFavorite ? <MinusOutlined /> : <PlusOutlined />}
            </Button>
          </Tooltip>
        </div>
      </div>
    </ConfigProvider>
  );
}
