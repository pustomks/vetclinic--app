import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DoctorsCard from "../DoctorsCard";

export default function DoctorsList() {
  const [doctor, setDoctor] = useState([]);
  const { token } = useSelector((state) => state.token);
  const [doctorHours, setDoctorHours] = useState([]);

  useEffect(() => {
    const allDoctors = async () => {
      try {
        const response = await fetch("/api/doctors");
        const data = await response.json();
        console.log(data);
        setDoctor(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    allDoctors();
  }, []);

  return (
    <div className="d-flex" style={{ gap: "20px" }}>
      {doctor.map((doctor) => (
        <DoctorsCard plusClick={plusClick} key={Math.random()} {...doctor} />
      ))}
    </div>
  );
}
