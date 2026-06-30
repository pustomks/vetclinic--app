import React from "react";
import { Input, Button } from "antd";
import styles from "./RegisterFormComp.module.css";
import { Controller } from "react-hook-form";

export default function RegisterFormComp({
  control,
  errors,
  loading,
  onSubmit,
  watch,
}) {
  return (
    <form className={styles.inputRegister} onSubmit={onSubmit}>
      <div className={styles.formInput}>
        <Controller
          control={control}
          name="username"
          rules={{ required: "Please enter user name!" }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter user name"
              disabled={loading}
              status={errors.username ? "error" : ""}
            />
          )}
        />
        {errors.username && (
          <div style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}>
            {errors.username.message}
          </div>
        )}
      </div>

      <div className={styles.formInput}>
        <Controller
          control={control}
          name="fullName"
          rules={{ required: "Please enter full name!" }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter full name"
              disabled={loading}
              status={errors.fullName ? "error" : ""}
            />
          )}
        />
        {errors.fullName && (
          <div style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}>
            {errors.fullName.message}
          </div>
        )}
      </div>

      <div className={styles.formInput}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Please enter email!",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter email"
              disabled={loading}
              status={errors.email ? "error" : ""}
            />
          )}
        />
        {errors.email && (
          <div style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}>
            {errors.email.message}
          </div>
        )}
      </div>
      <div className={styles.formInput}>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Please enter password!" }}
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder="Enter password"
              disabled={loading}
              status={errors.password ? "error" : ""}
            />
          )}
        />
        {errors.password && (
          <div style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}>
            {errors.password.message}
          </div>
        )}
      </div>
      <div className={styles.formInput}>
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: "Please confirm your password!",
            validate: (value) =>
              value === watch("password") || "Passwords do not match!",
          }}
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder="Enter confirmPassword"
              disabled={loading}
              status={errors.confirmPassword ? "error" : ""}
            />
          )}
        />
        {errors.confirmPassword && (
          <div style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}>
            {errors.confirmPassword.message}
          </div>
        )}
      </div>
      <Button loading={loading} type="primary" htmlType="submit" block>
        Register
      </Button>
    </form>
  );
}
