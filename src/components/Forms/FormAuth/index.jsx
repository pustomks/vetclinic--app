import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../store/slices/tokenSlice";
import { Space, Input, Button } from "antd";
import { ConfigProvider, theme } from "antd";
import styles from "./FormAuth.module.css";
import api from "../../../api/axios";

export default function FormAuth() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.name);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post("/api/auth/login", formData);
      const { accessToken } = data;
      dispatch(login(accessToken));
      console.log(accessToken);
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err.status === 401) {
        setError("Incorrect login or password");
      } else {
        setError("Server error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>AUTHORIZATION</h2>

      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <form className={styles.inputAuth} onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="enter user name"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <Input.Password
            type="password"
            name="password"
            placeholder="enter password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <Button disabled={loading} type="primary" htmlType="submit" block>
            Login
          </Button>
          {error ? (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          ) : null}
        </form>
      </ConfigProvider>
    </div>
  );
}
