import React, { useEffect, useState } from "react";
import { Modal, Card, Descriptions, Button, Space, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DoctorsScheduleAdmin from "../DoctorsScheduleAdmin";
import DoctorsScheduleForm from "../DoctorsScheduleForm";

const DoctorsCardAdmin = React.memo(
  ({
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
  }) => {
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

    const handleDelete = () => {
      deleteDoctor(id);
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
              <Button type="primary" danger onClick={handleDelete}>
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
            title="SCHEDULE"
            closable={true}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            styles={{
              header: {
                textAlign: "center",
              },
            }}
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
  },
);

export default DoctorsCardAdmin;
