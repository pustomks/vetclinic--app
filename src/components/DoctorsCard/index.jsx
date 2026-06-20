import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { WEEK_DAYS_DICTIONARY } from "../../const";
import { WEEK_DAYS } from "../../const";
import DoctorsSchedule from "../DoctorsSchedule";
import styles from "./DoctorsCard.module.css";
import { Modal, App } from "antd";
import { Card, Descriptions, Button, Space } from "antd";
import api from "../../api/axios";

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
  const { message } = App.useApp();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (id) {
      getWorkingHours();
    }
  }, [id]);

  const getWorkingHours = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/doctors/${id}/working-hours`);
      const { schedule } = response.data;
      setDoctorHours(schedule);
      console.log(schedule);
    } catch (error) {
      console.log(error);
      message.error(
        error.response?.data?.message ||
          "Failed to load doctor's working hours",
      );
    } finally {
      setLoading(false);
    }
  };

  const doctorsSchedule = Object.entries(doctorHours)
    .filter(([day, intervals]) => intervals.length !== 0)
    .sort(
      ([dayA], [dayB]) => WEEK_DAYS.indexOf(dayA) - WEEK_DAYS.indexOf(dayB),
    );

  return (
    <Space
      orientation="vertical"
      size={16}
      style={{ width: "100%", alignItems: "center" }}
    >
      <Card
        title={`${firstName} ${lastName}`}
        style={{
          width: 650,
          textAlign: "left",
        }}
      >
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Специализация">
            {specialization}
          </Descriptions.Item>

          <Descriptions.Item label="Email">{email}</Descriptions.Item>

          <Descriptions.Item label="Телефон">{phone}</Descriptions.Item>

          <Descriptions.Item label="Лицензия">
            {veterinaryLicense}
          </Descriptions.Item>

          <Descriptions.Item label="Дата найма">{hiredOn}</Descriptions.Item>
        </Descriptions>
        <div
          style={{
            marginTop: 20,
            marginBottom: 10,
            fontWeight: "500",
            color: "rgba(255, 255, 255, 0.45)",
          }}
        >
          Доступное время для записи:
        </div>

        <Space direction="vertical" size={1} style={{ width: "100%" }}>
          {doctorsSchedule.length > 0 ? (
            doctorsSchedule.map(([day, intervals]) => (
              <DoctorsSchedule key={day} day={day} intervals={intervals} />
            ))
          ) : (
            <span
              style={{ color: "rgba(255, 255, 255, 0.25)", fontSize: "13px" }}
            >
              Нет доступных интервалов
            </span>
          )}
        </Space>
      </Card>
    </Space>
  );
}
