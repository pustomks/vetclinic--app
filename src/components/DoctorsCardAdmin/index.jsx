import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { WEEK_DAYS } from "../../const";

import { Modal, Card, Descriptions, Button, Space, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DoctorsScheduleAdmin from "../DoctorsScheduleAdmin";
import api from "../../api/axios";
import DoctorsScheduleForm from "../DoctorsScheduleForm";

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

  const showModal = () => {
    setIsModalOpen(true);
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

  return (
    <Space
      orientation="vertical"
      size={16}
      style={{ width: "100%", alignItems: "center" }}
    >
      <Card
        title={`${firstName} ${lastName}`}
        actions={[
          <Tooltip title="Edit doctor">
            <Button type="default" onClick={handleEdit}>
              <EditOutlined />
            </Button>
          </Tooltip>,

          <Tooltip title="Delete doctor">
            <Button type="primary" danger onClick={() => deleteDoctor(id)}>
              <DeleteOutlined />
            </Button>
          </Tooltip>,
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
          {/* {doctorsSchedule.map(([day, interval]) => (
              <DoctorsScheduleAdmin
                key={day}
                day={day}
                interval={interval}
                handleScheduleChange={handleScheduleChange}
              />
            ))} */}
          <DoctorsScheduleForm id={id} />
        </Modal>
      </Card>
    </Space>
  );
}
