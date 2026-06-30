import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../store/slices/tokenSlice";
import { App } from "antd";
import api from "../../../api/axios";
import { useForm } from "react-hook-form";
import AuthFormComp from "../../AuthFormComp";

export default function FormAuth() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message } = App.useApp();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await api.post("/api/auth/login", data);
      const { accessToken } = response.data;
      dispatch(login(accessToken));
      console.log(accessToken);
      message.success("Successfully authorized!");
      navigate("/");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.status === 401
          ? "Incorrect login or password"
          : "Server error";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AuthFormComp
        control={control}
        errors={errors}
        loading={loading}
        onSubmit={handleSubmit(onSubmit)}
      />
    </div>
  );
}
