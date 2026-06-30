import React from "react";
import { Controller } from "react-hook-form";
import { Input, Button } from "antd";
import styles from "./AuthFormComp.module.css";

export default function AuthFormComp({ control, errors, loading, onSubmit }) {
  return (
    <form className={styles.inputAuth} onSubmit={onSubmit}>
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
      <Button loading={loading} type="primary" htmlType="submit" block>
        Login
      </Button>
    </form>
  );
}
