import React, { useEffect, useState } from "react";
import Pet from "../../components/Pet";

export default function MyPetsPage() {
  const [formData, setFormData] = useState({
    name: "Nord",
    species: "DOG",
    breed: "taks",
    sex: "MALE",
    dateOfBirth: "2026-02-11",
    notes: "bla bla bla",
  });
  const [pets, setPets] = useState([]);
  const [editPet, setEditPet] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleImputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        species: "",
        breed: "",
        sex: "",
        dateOfBirth: "",
        notes: "",
      });
    }
  }, [editPet]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <h2>GET A PET</h2>
        {pets.map((pet) => (
          <Pet
            key={pet.id}
            setPets={setPets}
            setEditPet={setEditPet}
            pet={pet}
          />
        ))}
      </div>
      <div>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Назад
        </button>
        <span>
          Страница {page} из {totalPages}
        </span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
          Вперед
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
      >
        <input
          type="text"
          name="name"
          placeholder="enter name"
          value={formData.name}
          onChange={handleImputChange}
          required
        />
        <input
          type="text"
          name="species"
          placeholder="enter species"
          value={formData.species}
          onChange={handleImputChange}
          required
        />
        <input
          type="text"
          name="breed"
          placeholder="enter breed"
          value={formData.breed}
          onChange={handleImputChange}
          required
        />
        <input
          type="text"
          name="sex"
          placeholder="enter sex"
          value={formData.sex}
          onChange={handleImputChange}
          required
        />
        <input
          type="text"
          name="dateOfBirth"
          placeholder="enter date of birth"
          value={formData.dateOfBirth}
          onChange={handleImputChange}
          required
        />
        <input
          type="text"
          name="notes"
          placeholder="enter notes"
          value={formData.notes}
          onChange={handleImputChange}
          required
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
}
