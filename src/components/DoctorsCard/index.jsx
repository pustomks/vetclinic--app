import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { WEEK_DAYS_DICTIONARY } from "../../const";
import DoctorsSchedule from "../DoctorsSchedule";
import styles from "./DoctorsCard.module.css";
import { Modal } from "antd";

export default function DoctorsCard({
  firstName,
  lastName,
  specialization,
  email,
  phone,
  veterinaryLicense,
  hiredOn,
  id,
}) {
  const [doctorHours, setDoctorHours] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getWorkingHours = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/doctors/${id}/working-hours`);
      const { schedule } = await response.json();
      setDoctorHours(schedule);

      console.log(schedule);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const doctorsSchedule = Object.entries(doctorHours).filter(
    ([day, intervals]) => intervals.length !== 0,
  );

  return (
    <div className={styles.card}>
      <h3>{`${firstName} ${lastName}`}</h3>
      <div>
        <p>Специализация:{specialization}</p>
        <p>Email:{email}</p>
        <p>Телефон:{phone}</p>
        <p>Лицензия:{veterinaryLicense}</p>
        <p>Дата найма:{hiredOn}</p>
      </div>
      {doctorsSchedule.length === 0 && (
        <button disabled={loading} onClick={getWorkingHours}>
          {loading ? "Загрузка" : "Расписание"}
        </button>
      )}
      {doctorsSchedule.map(([day, intervals]) => (
        <DoctorsSchedule key={day} day={day} intervals={intervals} />
      ))}
      {doctorsSchedule.length > 0 && (
        <button onClick={showModal}>Записаться</button>
      )}
      <Modal
        title={`Расписание врача: ${firstName} ${lastName}`}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <h4>Доступные часы для записи:</h4>

          {doctorsSchedule.map(([day, intervals]) => (
            <DoctorsSchedule key={day} day={day} intervals={intervals} />
          ))}
        </div>
      </Modal>
    </div>
  );
}
