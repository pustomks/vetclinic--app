import React from "react";
import styles from "./DoctorListAdmin.module.css";
import DoctorsCardAdmin from "../DoctorsCardAdmin";

const DoctorsListAdmin = React.memo(
  ({ doctors, deleteDoctor, startEditDoctor }) => {
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
  },
);

export default DoctorsListAdmin;
