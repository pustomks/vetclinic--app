import React, { useState } from "react";
import { App } from "antd";
import api from "../../../api/axios";
import RegisterFormComp from "../../RegisterFormComp";
import { useForm } from "react-hook-form";
export default function FormRegister() {
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    const { confirmPassword, ...payload } = data;
    setLoading(true);
    try {
      const response = await api.post("/api/auth/register", payload);
      console.log(response.data);

      message.success("Registration successful! You can now log in.");
      reset();
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
      <RegisterFormComp
        control={control}
        errors={errors}
        loading={loading}
        watch={watch}
        onSubmit={handleSubmit(onSubmit)}
      />
    </div>
  );
}
