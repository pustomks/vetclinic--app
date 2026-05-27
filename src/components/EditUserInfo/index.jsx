import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/tokenSlice";
import { Space, Input, Button } from "antd";
import { ConfigProvider, theme } from "antd";
import styles from "./EditUserInfo.module.css";

export default function EditUserInfo() {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.token);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("error");
        }
        const { email, fullName } = await response.json();
        setFormData({
          email,
          fullName,
        });
      } catch (error) {
        console.log(error);
        setError(true);
        dispatch(logout());
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
    try {
      const response = await fetch("/api/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setFormData({
          email: data.email,
          fullName: data.fullName,
        });
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (error) return <h1> ERROR</h1>;
  return (
    <div className={styles.editContainer}>
      <h2>Редактировать профиль</h2>

      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
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
          <Button type="primary" htmlType="submit" block>
            Save
          </Button>
        </form>
      </ConfigProvider>
    </div>
  );
}
