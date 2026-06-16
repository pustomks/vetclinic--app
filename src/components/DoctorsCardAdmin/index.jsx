import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { WEEK_DAYS } from "../../const";

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
  const [weeklyScheduleDoctors, setWeeklyScheduleDoctors] = useState({});
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

  const handleScheduleChange = (dayNumber, dayIntervals) => {
    setWeeklyScheduleDoctors((prev) => ({
      ...prev,
      [dayNumber]: dayIntervals,
    }));
  };

  const handleSaveWeeklySchedule = async () => {
    setIsLoading(true);

    const allIntervals = Object.values(weeklyScheduleDoctors)
      .flat()
      .filter((item) => item && item.startTime && item.endTime)
      .map((item) => ({
        dayOfWeek: Number(item.dayOfWeek),
        startTime: item.startTime,
        endTime: item.endTime,
      }));

    const formData = {
      intervals: allIntervals,
    };
    try {
      const response = await api.put(
        `/api/doctors/${id}/working-hours`,
        formData,
      );
      getWorkinghours();
      setIsModalOpen(false);
    } catch (error) {
      console.log("Error");
    } finally {
      setIsLoading(false);
    }
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
            footer={[
              <Button key="cancel" onClick={handleCancel}>
                Отмена
              </Button>,
              <Button
                key="save"
                type="primary"
                loading={isLoading}
                onClick={handleSaveWeeklySchedule}
              >
                Сохранить расписание
              </Button>,
            ]}
          >
            {doctorsSchedule.map(([day, interval]) => (
              <DoctorsSheduleAdmin
                key={day}
                day={day}
                interval={interval}
                handleScheduleChange={handleScheduleChange}
              />
            ))}
          </Modal>
        </Card>
      </Space>
    </ConfigProvider>
  );
}
