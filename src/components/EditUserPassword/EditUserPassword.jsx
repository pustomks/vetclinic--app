import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Space, Input, Button, App } from "antd";
import styles from "./EditUserPassword.module.css";
import api from "../../api/axios";

export default function EditUserPassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.token);

  const { message } = App.useApp();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.put("/api/users/me/password", formData);
      const data = response.data;
      message.success("Password changed successfully!");
      setFormData({ currentPassword: "", newPassword: "" });
    } catch (error) {
      console.error(error);
      message.error(
        error.response?.data?.message || "Failed to change password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.editContainer}>
      <h2>Изменить пароль</h2>
      <form className={styles.editUserPassword} onSubmit={handleSubmit}>
        <Input.Password
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleInputChange}
          placeholder="Current password"
          required
        />
        <Input.Password
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleInputChange}
          placeholder="New password"
          required
        />
        <Button type="primary" htmlType="submit" block>
          Save
        </Button>
      </form>
    </div>
  );
}
