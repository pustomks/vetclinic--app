import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DoctorsCardAdmin from "../DoctorsCardAdmin";
import { Button } from "antd";
import { ConfigProvider, theme } from "antd";
import styles from "./DoctorListAdmin.module.css";
import api from "../../api/axios";

export default function DoctorsListAdmin({
  doctor,
  page,
  totalPages,
  setPage,
  deleteDoctor,
}) {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div className={styles.doctorListContainer}>
        <div className={styles.doctorList}>
          <h2>DOCTORS</h2>
          {doctor.map((doctor) => (
            <DoctorsCardAdmin
              key={doctor.id}
              deleteDoctor={deleteDoctor}
              {...doctor}
            />
          ))}
        </div>

        <div className={styles.pageDoctor}>
          <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>
            Назад
          </Button>
          <span>
            Страница {page} из {totalPages}
          </span>
          <Button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Вперед
          </Button>
        </div>
      </div>
    </ConfigProvider>
  );
}
