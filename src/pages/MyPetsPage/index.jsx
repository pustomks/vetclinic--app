import React, { useEffect, useState } from "react";
import Pet from "../../components/Pet";
import { DatePicker, Select, Space, Input, Button } from "antd";
import dayjs from "dayjs";
import { ConfigProvider, theme } from "antd";
import styles from "./MyPetsPage.module.css";
export default function MyPetsPage() {
  const [formData, setFormData] = useState({
    name: "",
    species: undefined,
    breed: "",
    sex: undefined,
    dateOfBirth: "",
    notes: "",
  });
  const [pets, setPets] = useState([]);
  const [editPet, setEditPet] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const onChange = (date, dateString) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: dateString,
    }));
  };

  const handleImputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSexChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      sex: value,
    }));
  };

  const handleSpeciesChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      species: value,
    }));
  };

  const token = localStorage.getItem("jwt");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editPet ? `/api/pets/me/${editPet.id}` : "/api/pets/me";
    const method = editPet ? "PUT" : "POST";
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Error");
      }
      const data = await response.json();

      setPets((previous) =>
        editPet
          ? previous.map((pet) => (pet.id === editPet.id ? data : pet))
          : [data, ...pets],
      );

      setFormData({
        name: "",
        species: undefined,
        breed: "",
        sex: undefined,
        dateOfBirth: "",
        notes: "",
      });

      setEditPet(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getPets = async () => {
      try {
        const response = await fetch(`/api/pets/me?pageNumber=${page}&size=5`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("error while loading pets");
        }
        console.log(response);
        const { results, info } = await response.json();
        setPets(results);
        console.log(results, info);
        setTotalPages(info.pages);
      } catch (error) {
        console.log(error);
      }
    };
    getPets();
  }, [page]);

  useEffect(() => {
    if (editPet) {
      setFormData({
        name: editPet.name,
        species: editPet.species,
        breed: editPet.breed,
        sex: editPet.sex,
        dateOfBirth: editPet.dateOfBirth,
        notes: editPet.notes,
      });
    } else {
      setFormData({
        name: "",
        species: undefined,
        breed: "",
        sex: undefined,
        dateOfBirth: "",
        notes: "",
      });
    }
  }, [editPet]);

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div className={styles.petPetsContainer}>
        <h2>PET</h2>
        <div className={styles.petsList}>
          {pets.map((pet) => (
            <Pet
              key={pet.id}
              setPets={setPets}
              setEditPet={setEditPet}
              pet={pet}
            />
          ))}
        </div>

        <div className={styles.pagePet}>
          <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>
            Назад
          </Button>
          <span>
            Страница {page} из {totalPages}
          </span>
          <Button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Вперед
          </Button>
        </div>

        <form className={styles.myPetsForm} onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="enter name"
            value={formData.name}
            onChange={handleImputChange}
            required
          />
          <Select
            placeholder="enter species"
            value={formData.species}
            onChange={handleSpeciesChange}
            style={{ width: "100%", textAlign: "left" }}
            options={[
              { value: "DOG", label: "Dog" },
              { value: "CAT", label: "Cat" },
              { value: "BIRD", label: "Bird" },
              { value: "RODENTS", label: "Rodents" },
            ]}
          />

          <Input
            type="text"
            name="breed"
            placeholder="enter breed"
            value={formData.breed}
            onChange={handleImputChange}
            required
          />
          <Select
            placeholder="enter sex"
            value={formData.sex}
            onChange={handleSexChange}
            style={{ width: "100%", textAlign: "left" }}
            options={[
              { value: "MALE", label: "Male" },
              { value: "FEMALE", label: "Female" },
            ]}
          />

          <Space direction="vertical" style={{ width: "100%" }}>
            <DatePicker
              onChange={onChange}
              value={
                formData.dateOfBirth
                  ? dayjs(formData.dateOfBirth, "YYYY-MM-DD")
                  : null
              }
              format="YYYY-MM-DD"
              placeholder="enter date of birth"
              style={{ width: "100%" }}
              disabledDate={(current) =>
                current && current > dayjs().endOf("day")
              }
            />
          </Space>
          <Input
            type="text"
            name="notes"
            placeholder="enter notes"
            value={formData.notes}
            onChange={handleImputChange}
            required
          />
          <Button type="primary" htmlType="submit" block>
            {editPet ? "Edit" : "Save"}
          </Button>
        </form>
      </div>
    </ConfigProvider>
  );
}
