import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditUserPassword from "../../components/EditUserPassword/EditUserPassword";
import EditUserInfo from "../../components/EditUserInfo";
import styles from "./MyProfilePage.module.css";

export default function MyProfilePage() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.editUserInfo}>
        <EditUserInfo />
      </div>
      <div className={styles.editUserInfo}>
        <EditUserPassword />
      </div>
    </div>
  );
}
