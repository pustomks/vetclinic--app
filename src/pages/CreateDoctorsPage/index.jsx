import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function CreateDoctorsPage() {
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
      const response = await fetch(`/api/doctors/${id}`, {
        method: PUT,
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

  return <div>CreateDoctorsPage</div>;
}
