import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./CreateDoctors.module.css";
import { Input, Button, Space, DatePicker, InputNumber, Select } from "antd";
import { ConfigProvider, theme } from "antd";
import dayjs from "dayjs";
import api from "../../api/axios";

export default function CreateDoctors({ fetchAllDoctors, setDoctor }) {
  const { token } = useSelector((state) => state.token);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    specialization: "",
    phone: "",
    email: "",
    veterinaryLicense: "",
    bio: "",
    photoUrl: "",
    dateOfBirth: "",
    yearsOfExperience: null,
    hiredOn: "",
    active: null,
  });

  const editDoctor = async (id) => {
    try {
      const response = await api.put(`/api/doctors/${id}`);
    } catch (error) {
      console.log("Error");
    }
  };

  const onChangeDateOfBirth = (date, dateString) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: dateString,
    }));
  };

  const onChangeHiredOn = (date, dateString) => {
    setFormData((prev) => ({
      ...prev,
      hiredOn: dateString,
    }));
  };

  const handleNumberChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      yearsOfExperience: value,
    }));
  };

  const handleActiveChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      active: value,
    }));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Error");
      }
      const data = await response.json();
      console.log(data);
      setDoctor((prev) => [data, ...prev]);
      fetchAllDoctors();

      setFormData({
        firstName: "",
        lastName: "",
        specialization: "",
        phone: "",
        email: "",
        veterinaryLicense: "",
        bio: "",
        photoUrl: "",
        dateOfBirth: "",
        yearsOfExperience: null,
        hiredOn: "",
        active: null,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div>
        <h2>CREATE DOCTOR</h2>
        <form
          className={styles.mainForm}
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            name="specialization"
            placeholder="Enter specialization"
            value={formData.specialization}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            name="phone"
            placeholder="Enter phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            name="email"
            placeholder="Enter e-mail"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            name="veterinaryLicense"
            placeholder="Enter veterinaryLicense"
            value={formData.veterinaryLicense}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            name="bio"
            placeholder="Enter bio"
            value={formData.bio}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            name="photoUrl"
            placeholder="Enter photo url"
            value={formData.photoUrl}
            onChange={handleInputChange}
            required
          />
          <InputNumber
            min={0}
            max={100}
            placeholder="Enter years of experience"
            value={formData.yearsOfExperience}
            onChange={handleNumberChange}
            style={{ width: "100%" }}
            required
          />
          <Space orientation="vertical" style={{ width: "100%" }}>
            <DatePicker
              onChange={onChangeDateOfBirth}
              value={
                formData.dateOfBirth
                  ? dayjs(formData.dateOfBirth, "YYYY-MM-DD")
                  : null
              }
              format="YYYY-MM-DD"
              placeholder="enter date of birth"
              style={{ width: "100%" }}
              disabledDate={(current) =>
                current && current > dayjs().endOf("day")
              }
            />
          </Space>
          <Space orientation="vertical" style={{ width: "100%" }}>
            <DatePicker
              onChange={onChangeHiredOn}
              value={
                formData.hiredOn ? dayjs(formData.hiredOn, "YYYY-MM-DD") : null
              }
              format="YYYY-MM-DD"
              placeholder="enter hired on"
              style={{ width: "100%" }}
              disabledDate={(current) =>
                current && current > dayjs().endOf("day")
              }
            />
          </Space>
          <Select
            placeholder="Enter active"
            value={formData.active}
            onChange={handleActiveChange}
            style={{ width: "100%", textAlign: "left" }}
            options={[
              { value: true, label: "Actived" },
              { value: false, label: "Not actived" },
            ]}
          />
          <Button type="primary" htmlType="submit" block>
            Create
          </Button>
        </form>
      </div>
    </ConfigProvider>
  );
}
