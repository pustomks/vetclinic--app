import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/tokenSlice";
import { Space, Input, Button, App } from "antd";
import styles from "./EditUserInfo.module.css";
import api from "../../api/axios";

export default function EditUserInfo() {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
  });
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.token);

  const { message } = App.useApp();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/users/me");
        const { email, fullName } = response.data;
        setFormData({
          email,
          fullName,
        });
      } catch (error) {
        console.log(error);
        dispatch(logout());
        message.error(
          error.response?.data?.message || "Failed to load user profile",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.patch("/api/users/me", formData);
      const data = response.data;
      setFormData({
        email: data.email,
        fullName: data.fullName,
      });
      console.log(data);
      message.success("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      message.error(
        error.response?.data?.message || "Failed to update profile information",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.editContainer}>
      <h2>Редактировать профиль</h2>

      <form className={styles.formEditUserInfo} onSubmit={handleSubmit}>
        <Input
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Full Name"
          disabled={loading}
        />
        <Input
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          disabled={loading}
        />
        <Button loading={loading} type="primary" htmlType="submit" block>
          Save
        </Button>
      </form>
    </div>
  );
}
