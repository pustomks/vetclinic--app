import React, { useEffect, useState } from "react";
import { Space, Input, Button } from "antd";
import { ConfigProvider, theme } from "antd";
import styles from "./FormRegister.module.css";

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
    const { confirmPassword, ...payload } = formData;
    setPasswordError(false);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>REGISTRATION</h2>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <form className={styles.inputRegister} onSubmit={handleSubmit}>
          {passwordError && <p style={{ color: "red" }}>Пароли не совпадают</p>}
          <Input
            type="text"
            name="username"
            placeholder="enter user name"
            value={formData.username}
            onChange={handleImputChange}
            required
          />
          <Input
            type="text"
            name="fullName"
            placeholder="enter full name"
            value={formData.fullName}
            onChange={handleImputChange}
            required
          />
          <Input
            type="text"
            name="email"
            placeholder="enter email"
            value={formData.email}
            onChange={handleImputChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="enter password"
            value={formData.password}
            onChange={handleImputChange}
            required
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="enter confirmPassword"
            value={formData.confirmPassword}
            onChange={handleImputChange}
            required
          />

          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </form>
      </ConfigProvider>
    </div>
  );
}
