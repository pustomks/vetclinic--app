import React, { useEffect, useState } from "react";

export default function FormRegister() {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState(false);

  const handleImputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.confirmPassword !== formData.password) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log(response);

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>REGISTRATION</h2>
      <form onSubmit={handleSubmit}>
        {passwordError && <p style={{ color: "red" }}>Пароли не совпадают</p>}
        <input
          type="text"
          name="username"
          placeholder="enter user name"
          value={formData.username}
          onChange={handleImputChange}
          required
        />
        <input
          type="text"
          name="fullName"
          placeholder="enter full name"
          value={formData.fullName}
          onChange={handleImputChange}
          required
        />
        <input
          type="text"
          name="email"
          placeholder="enter email"
          value={formData.email}
          onChange={handleImputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="enter password"
          value={formData.password}
          onChange={handleImputChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="enter confirmPassword"
          value={formData.confirmPassword}
          onChange={handleImputChange}
          required
        />

        <button type="submit">register</button>
      </form>
    </div>
  );
}
