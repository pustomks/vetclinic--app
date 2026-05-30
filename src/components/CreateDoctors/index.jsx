import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./CreateDoctors.module.css";
import { Input, Button } from "antd";
import { ConfigProvider, theme } from "antd";

export default function CreateDoctors() {
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
    yearsOfExperience: 100,
    hiredOn: "",
    active: true,
  });

  const handleImputChange = (e) => {
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
        yearsOfExperience: 100,
        hiredOn: "",
        active: true,
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
            onChange={handleImputChange}
            required
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleImputChange}
            required
          />
          <Input
            type="text"
            name="specialization"
            placeholder="Enter specialization"
            value={formData.specialization}
            onChange={handleImputChange}
            required
          />
          <Input
            type="text"
            name="phone"
            placeholder="Enter phone"
            value={formData.phone}
            onChange={handleImputChange}
            required
          />
          <Input
            type="text"
            name="email"
            placeholder="Enter e-mail"
            value={formData.email}
            onChange={handleImputChange}
            required
          />
          <Input
            type="text"
            name="veterinaryLicense"
            placeholder="Enter veterinaryLicense"
            value={formData.veterinaryLicense}
            onChange={handleImputChange}
            required
          />
          <Input
            type="text"
            name="bio"
            placeholder="Enter bio"
            value={formData.bio}
            onChange={handleImputChange}
            required
          />
          <Input
            type="text"
            name="photoUrl"
            placeholder="Enter photo url"
            value={formData.photoUrl}
            onChange={handleImputChange}
            required
          />
          <Input
            type="text"
            name="dateOfBirth"
            placeholder="Enter date of birth"
            value={formData.dateOfBirth}
            onChange={handleImputChange}
            required
          />
          <Input
            type="text"
            name="hiredOn"
            placeholder="enter hiredOn"
            value={formData.hiredOn}
            onChange={handleImputChange}
            required
          />
          <Button type="primary" htmlType="submit" block>
            Create
          </Button>
        </form>
      </div>
    </ConfigProvider>
  );
}
