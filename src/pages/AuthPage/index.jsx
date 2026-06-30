import { useState } from "react";
import FormRegister from "../../components/Forms/FormRegister";
import FormAuth from "../../components/Forms/FormAuth";
import styles from "./AuthPage.module.css";
import { Tabs } from "antd";

export default function AuthPage() {
  const [authType, setAuthType] = useState("auth");

  const onChange = (key) => {
    setAuthType(key);
  };

  const items = [
    {
      key: "auth",
      label: "Authorise",
      children: <FormAuth />,
    },
    {
      key: "reg",
      label: "Register",
      children: <FormRegister />,
    },
  ];

  return (
    <div className={styles.containerAuth}>
      <Tabs activeKey={authType} onChange={onChange} centered items={items} />
    </div>
  );
}
