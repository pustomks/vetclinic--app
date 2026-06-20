import React from "react";
import { Card, Space, Descriptions, Tag } from "antd";

export default function PetCard({ pet }) {
  return (
    <Space
      direction="vertical"
      size={16}
      style={{ width: "100%", alignItems: "center" }}
    >
      <Card
        title={pet.name}
        style={{
          width: 650,
          textAlign: "left",
        }}
      >
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Species">{pet.species}</Descriptions.Item>

          <Descriptions.Item label="Breed">{pet.breed}</Descriptions.Item>

          <Descriptions.Item label="Sex">{pet.sex}</Descriptions.Item>

          <Descriptions.Item label="Date of birth">
            {pet.dateOfBirth}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Space>
  );
}
