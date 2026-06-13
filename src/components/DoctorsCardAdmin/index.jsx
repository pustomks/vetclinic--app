import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { WEEK_DAYS_DICTIONARY } from "../../const";

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
import DoctorsSheduleAdmin from "../DoctorsSheduleAdmin";
import api from "../../api/axios";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorHours, setDoctorHours] = useState({});
  const [editDoctorHours, setEditDoctorHours] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    getWorkinghours();
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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

  const getWorkinghours = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/api/doctors/${id}/working-hours`);
      const data = response.data;
      setDoctorHours(data.schedule);
      console.log(data.schedule);
    } catch (error) {
      console.log("Error");
    } finally {
      setIsLoading(false);
    }
  };
  const doctorsSchedule = Object.entries(doctorHours);

  const editDoctorWorkingHours = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = {
      intervals: [
        {
          dayOfWeek: Number(editDoctorHours.dayOfWeek),
          startTime: editDoctorHours.startTime,
          endTime: editDoctorHours.endTime,
        },
      ],
    };
    try {
      const response = await api.put(
        `/api/doctors/${id}/working-hours`,
        formData,
      );
      const { intervals } = response.data;
      setEditDoctorHours({ dayOfWeek: "", startTime: "", endTime: "" });
      getWorkinghours();
    } catch (error) {
      console.log("Error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDoctorsHourschange = (e) => {
    const { name, value } = e.target;
    setEditDoctorHours((prev) => ({
      ...prev,
      [name]: value,
    }));
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
            <Button type="default" onClick={handleEdit}>
              <EditOutlined />
            </Button>,
            <Button type="primary" danger onClick={() => deleteDoctor(id)}>
              <DeleteOutlined />
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

          <Button
            style={{ marginTop: "25px" }}
            type="dashed"
            onClick={showModal}
            block
          >
            Working hours
          </Button>
          <Modal
            title="Schedule"
            closable={true}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            {doctorsSchedule.map(([day, interval]) => (
              <DoctorsSheduleAdmin key={day} day={day} interval={interval} />
            ))}

            <form
              onSubmit={editDoctorWorkingHours}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <input
                type="number"
                name="dayOfWeek"
                placeholder="Day of week (1-7)"
                value={editDoctorHours.dayOfWeek}
                onChange={handleDoctorsHourschange}
                min="1"
                max="7"
                required
              />
              <input
                type="text"
                name="startTime"
                placeholder="Start time (09:00)"
                value={editDoctorHours.startTime}
                onChange={handleDoctorsHourschange}
              />
              <input
                type="text"
                name="endTime"
                placeholder="End time (18:00)"
                value={editDoctorHours.endTime}
                onChange={handleDoctorsHourschange}
              />
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
                style={{ marginTop: "10px" }}
              >
                Save
              </Button>
            </form>
          </Modal>
        </Card>
      </Space>
    </ConfigProvider>
  );
}
