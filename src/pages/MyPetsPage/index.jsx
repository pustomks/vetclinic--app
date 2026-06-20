import React, { useEffect, useState } from "react";
import Pet from "../../components/Pet";
import { DatePicker, Select, Space, Input, Button, App } from "antd";
import dayjs from "dayjs";
import styles from "./MyPetsPage.module.css";
import { useSelector } from "react-redux";
import api from "../../api/axios";
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
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.token);

  const { message } = App.useApp();

  const onChange = (date, dateString) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: dateString,
    }));
  };

  const handleInputChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = editPet ? `/api/pets/me/${editPet.id}` : "/api/pets/me";
    const method = editPet ? "put" : "post";
    try {
      const response = await api[method](url, formData);
      const data = response.data;
      if (editPet) {
        setPets((previous) =>
          previous.map((pet) => (pet.id === editPet.id ? data : pet)),
        );
        message.success(`${formData.name}'s information updated successfully!`);
      } else {
        message.success(`${formData.name} added successfully!`);
        if (page === 1) {
          getPets();
        } else {
          setPage(1);
        }
      }
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
      const errorText = editPet ? "Failed to update pet" : "Failed to add pet";
      message.error(error.response?.data?.message || errorText);
    } finally {
      setLoading(false);
    }
  };
  const getPets = async () => {
    try {
      const response = await api.get("/api/pets/me", {
        params: {
          pageNumber: page,
          size: 5,
        },
      });
      const { results, info } = response.data;
      if (results.length === 0 && page > 1) {
        setPage(page - 1);
        return;
      }
      setPets(results);
      setTotalPages(info.pages || 1);
    } catch (error) {
      console.log(error);
      message.error(
        error.response?.data?.message || "Failed to load pets list",
      );
    }
  };

  useEffect(() => {
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
    <div className={styles.petPetsContainer}>
      <h2>PET</h2>

      {pets.length === 0 ? (
        <h3>Пока нет добавленных питомцев</h3>
      ) : (
        <>
          <div className={styles.petsList}>
            {pets.map((pet) => (
              <Pet
                key={pet.id}
                setPets={setPets}
                setEditPet={setEditPet}
                pet={pet}
                getPets={getPets}
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
        </>
      )}

      <form className={styles.myPetsForm} onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="enter name"
          value={formData.name}
          onChange={handleInputChange}
          disabled={loading}
          required
        />
        <Select
          placeholder="enter species"
          value={formData.species}
          onChange={handleSpeciesChange}
          disabled={loading}
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
          onChange={handleInputChange}
          disabled={loading}
          required
        />
        <Select
          placeholder="enter sex"
          value={formData.sex}
          onChange={handleSexChange}
          disabled={loading}
          style={{ width: "100%", textAlign: "left" }}
          options={[
            { value: "MALE", label: "Male" },
            { value: "FEMALE", label: "Female" },
          ]}
        />

        <Space orientation="vertical" style={{ width: "100%" }}>
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
            disabled={loading}
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
          onChange={handleInputChange}
          disabled={loading}
          required
        />

        <Button loading={loading} type="primary" htmlType="submit" block>
          {editPet ? "Edit" : "Save"}
        </Button>
      </form>
    </div>
  );
}
