import React, { useState } from "react";
import styles from "./DoctorListAdmin.module.css";
import DoctorsCardAdmin from "../DoctorsCardAdmin";

export default function DoctorsListAdmin({
  doctors,
  deleteDoctor,
  startEditDoctor,
}) {
  return (
    <div className={styles.doctorListContainer}>
      <div className={styles.doctorList}>
        <h2>DOCTORS</h2>
        {doctors.map((doctor) => (
          <DoctorsCardAdmin
            key={doctor.id}
            deleteDoctor={deleteDoctor}
            startEditDoctor={startEditDoctor}
            {...doctor}
          />
        ))}
      </div>
    </div>
  );
}
