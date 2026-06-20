import React, { useEffect, useState } from "react";
import Pet from "../../components/Pet";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PetCard from "../../components/PetCard";
import styles from "./MyPetPage.module.css";
import { App } from "antd";
import api from "../../api/axios";

export default function MyPetPage() {
  const [pet, setPet] = useState(null);
  const { id } = useParams();
  const { token } = useSelector((state) => state.token);
  const { message } = App.useApp();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await api.get(`/api/pets/me/${id}`);
        const data = response.data;
        setPet(data);
      } catch (error) {
        console.log(error);
        message.error(error.response?.data?.message || "Failed to load pet");
      }
    };
    fetchPet();
  }, []);

  if (!pet) {
    return <h2>Питомец не найден</h2>;
  }

  return (
    <div className={styles.mainCard}>
      <PetCard pet={pet} />
    </div>
  );
}
