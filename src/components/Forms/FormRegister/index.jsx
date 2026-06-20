import React, { useState } from "react";
import { Input, Button, App } from "antd";
import styles from "./FormRegister.module.css";
import api from "../../../api/axios";
export default function FormRegister() {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.confirmPassword !== formData.password) {
      message.error("Passwords do not match!");
      return;
    }
    const { confirmPassword, ...payload } = formData;
    setLoading(true);
    try {
      const response = await api.post("/api/auth/register", payload);
      const data = response.data;
      console.log(data);
      message.success("Registration successful! You can now log in.");
      setFormData({
        username: "",
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
      message.error(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>REGISTRATION</h2>

      <form className={styles.inputRegister} onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          placeholder="enter user name"
          value={formData.username}
          onChange={handleInputChange}
          disabled={loading}
          required
        />
        <Input
          type="text"
          name="fullName"
          placeholder="enter full name"
          value={formData.fullName}
          onChange={handleInputChange}
          disabled={loading}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="enter email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={loading}
          required
        />
        <Input.Password
          type="password"
          name="password"
          placeholder="enter password"
          value={formData.password}
          onChange={handleInputChange}
          disabled={loading}
          required
        />
        <Input.Password
          type="password"
          name="confirmPassword"
          placeholder="enter confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          disabled={loading}
          required
        />

        <Button loading={loading} type="primary" htmlType="submit" block>
          Register
        </Button>
      </form>
    </div>
  );
}
