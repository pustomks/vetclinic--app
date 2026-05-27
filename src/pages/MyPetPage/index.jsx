import React, { useEffect, useState } from "react";
import Pet from "../../components/Pet";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PetCard from "../../components/PetCard";
import styles from "./MyPetPage.module.css";

export default function MyPetPage() {
  const [pet, setPet] = useState({});
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { token } = useSelector((state) => state.token);
  console.log(token);
  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`/api/pets/me/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          setError(response.status);
          return;
        }
        const data = await response.json();
        console.log(data);
        setPet(data);
      } catch (error) {
        setError("server down");
      }
    };
    fetchPet();
  }, []);

  if (error === 404) {
    return <h1>not found</h1>;
  }
  if (error) {
    return <h1>server error</h1>;
  }

  return (
    <div className={styles.mainCard}>
      <PetCard pet={pet} />
    </div>
  );
}
