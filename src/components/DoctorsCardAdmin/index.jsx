import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { WEEK_DAYS_DICTIONARY } from "../../const";
import DoctorsSchedule from "../DoctorsSchedule";
import {
  Modal,
  Card,
  Descriptions,
  Button,
  ConfigProvider,
  theme,
  Space,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function DoctorsCardAdmin({
  id,
  firstName,
  lastName,
  specialization,
  email,
  phone,
  veterinaryLicense,
  hiredOn,
  dateOfBirth,
  deleteDoctor,
  startEditDoctor,
  ...doctor
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

  const handleEdit = () => {
    startEditDoctor({
      id,
      firstName,
      lastName,
      specialization,
      email,
      phone,
      veterinaryLicense,
      hiredOn,
      dateOfBirth,
      ...doctor,
    });
  };

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Space
        orientation="vertical"
        size={16}
        style={{ width: "100%", alignItems: "center" }}
      >
        <Card
          title={`${firstName} ${lastName}`}
          actions={[
            <Button type="primary" danger onClick={() => deleteDoctor(id)}>
              <DeleteOutlined />
            </Button>,
            <Button type="default" danger onClick={handleEdit}>
              <EditOutlined />
            </Button>,
          ]}
          style={{
            width: 650,
            textAlign: "left",
          }}
        >
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="Специализация">
              {specialization}
            </Descriptions.Item>

            <Descriptions.Item label="Email">{email}</Descriptions.Item>

            <Descriptions.Item label="Телефон">{phone}</Descriptions.Item>

            <Descriptions.Item label="Лицензия">
              {veterinaryLicense}
            </Descriptions.Item>
            <Descriptions.Item label="Дата рождения">
              {dateOfBirth}
            </Descriptions.Item>

            <Descriptions.Item label="Дата найма">{hiredOn}</Descriptions.Item>
          </Descriptions>
        </Card>
      </Space>
    </ConfigProvider>
  );
}
