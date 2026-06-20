import { useDispatch, useSelector } from "react-redux";
import { toggleFavouritePet } from "../../store/slices/favoriteSlice";
import { Link } from "react-router-dom";
import {
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Button, Tooltip, App } from "antd";
import styles from "./Pet.module.css";
import api from "../../api/axios";
import { useState } from "react";

export default function Pet({ pet, setPets, setEditPet, getPets }) {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.token);
  const favorite = useSelector((state) => state.favorite);
  const dispatch = useDispatch();
  const isFavorite = favorite.find((item) => item.id === pet.id);
  const { message, modal } = App.useApp();

  const deletePet = async (id) => {
    modal.confirm({
      title: "Delete Pet",
      content: `Are you sure you want to delete ${pet.name}? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onCancel: () => setLoading(false),
      onOk: async () => {
        setLoading(true);
        try {
          const response = await api.delete(`/api/pets/me/${id}`);
          const data = response.data;
          setPets((previousPets) =>
            previousPets.filter((pet) => pet.id !== id),
          );
          message.success(`${pet.name} has been deleted successfully.`);
          if (getPets) {
            await getPets();
          }
        } catch (error) {
          console.log(error);
          message.error(
            error.response?.data?.message ||
              "Failed to delete pet. Please try again.",
          );
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <div className={styles.petContainer}>
      <Link className={styles.petLink} to={`/mypets/${pet.id}`}>
        {pet.name}
      </Link>

      <div className={styles.petButton}>
        <Tooltip title="Delete pet">
          <Button
            type="primary"
            danger
            loading={loading}
            onClick={() => deletePet(pet.id)}
          >
            <DeleteOutlined />
          </Button>
        </Tooltip>
        <Tooltip title="Edit pet">
          <Button disabled={loading} onClick={() => setEditPet(pet)}>
            <EditOutlined />
          </Button>
        </Tooltip>
        <Tooltip
          title={
            isFavorite ? "Remove pet from favorites" : "Add pet to favorites"
          }
        >
          <Button
            disabled={loading}
            onClick={() => dispatch(toggleFavouritePet(pet))}
          >
            {isFavorite ? <MinusOutlined /> : <PlusOutlined />}
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
