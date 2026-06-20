import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../store/slices/tokenSlice";
import { Input, Button, App } from "antd";
import styles from "./FormAuth.module.css";
import api from "../../../api/axios";

export default function FormAuth() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { message } = App.useApp();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.name);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/login", formData);
      const { accessToken } = data;
      dispatch(login(accessToken));
      console.log(accessToken);
      message.success("Successfully authorized!");
      navigate("/");
    } catch (err) {
      console.log(err);
      const errorMessage =
        err.response?.status === 401
          ? "Incorrect login or password"
          : "Server error";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>AUTHORIZATION</h2>

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
        <Button loading={loading} type="primary" htmlType="submit" block>
          Login
        </Button>
      </form>
    </div>
  );
}
