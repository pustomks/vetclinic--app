import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditUserPassword from "../../components/EditUserPassword/EditUserPassword";
import EditUserInfo from "../../components/EditUserInfo";

export default function MyProfilePage() {
  return (
    <div>
      <EditUserInfo />
      <EditUserPassword />
    </div>
  );
}
