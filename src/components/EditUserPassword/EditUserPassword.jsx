import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function EditUserPassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState(false);
  const { token } = useSelector((state) => state.token);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users/me/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("error");
      }
      setFormData({ currentPassword: "", newPassword: "" });
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  if (error) return <h1> ERROR </h1>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Изменить пароль</h2>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleInputChange}
          placeholder="Current password"
          required
        />
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleInputChange}
          placeholder="New password"
          required
        />
        <button type="submit">Сохранить изменения</button>
      </form>
    </div>
  );
}
