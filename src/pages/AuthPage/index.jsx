import React, { useState } from "react";
import FormRegister from "../../components/Forms/FormRegister";
import FormAuth from "../../components/Forms/FormAuth";
import styles from "./AuthPage.module.css";
import { Space, Button } from "antd";
import { ConfigProvider, theme } from "antd";
export default function AuthPage() {
  const [authType, setAuthType] = useState("auth");

  return (
    <div className={styles.containerAuth}>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <div className={styles.FormAuth}>
          {authType === "reg" ? <FormRegister /> : <FormAuth />}
        </div>

        <div className={styles.authButtons}>
          <Button block onClick={() => setAuthType("auth")}>
            authorise
          </Button>
          <Button block onClick={() => setAuthType("reg")}>
            register
          </Button>
        </div>
      </ConfigProvider>
    </div>
  );
}
