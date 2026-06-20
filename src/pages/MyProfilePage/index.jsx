import React from "react";
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
