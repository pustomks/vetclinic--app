import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../store/slices/tokenSlice";

export default function FormAuth() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleImputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.name);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log(response);
      const { accessToken } = await response.json();
      localStorage.setItem("jwt", accessToken);
      dispatch(login(accessToken));
      console.log(accessToken);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>AUTHORIZATION</h2>
      <h1>{loading.toString()}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="enter user name"
          value={formData.username}
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
        <button disabled={loading} type="submit">
          login
        </button>
      </form>
    </div>
  );
}
