import React, { useState } from "react";
import FormRegister from "../../components/Forms/FormRegister";
import FormAuth from "../../components/Forms/FormAuth";

export default function AuthPage() {
  const [authType, setAuthType] = useState("auth");

  return (
    <div>
      {authType === "reg" ? <FormRegister /> : <FormAuth />}

      <button onClick={() => setAuthType("auth")}>authorise</button>
      <button onClick={() => setAuthType("reg")}>register</button>
    </div>
  );
}
