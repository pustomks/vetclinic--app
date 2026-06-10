import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreateDoctors from "../../components/CreateDoctors";
import api from "../../api/axios";
import { message } from "antd";

export default function DoctorsOfficePage() {
  const [doctors, setDoctors] = useState([]);
  const { token } = useSelector((state) => state.token);

  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const response = await api.get("/api/doctors");
        const data = response.data;
        console.log(data);
        setDoctors([...data.results].reverse());
      } catch (error) {
        console.log("error");
      }
    };
    fetchAllDoctors();
  }, []);

  const deleteDoctor = async (id) => {
    try {
      const response = await api.delete(`/api/doctors/${id}`);
      const data = response.data;
      setDoctors((prev) => prev.filter((doctor) => doctor.id !== id));
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <div>
      <div>
        <CreateDoctors
          doctors={doctors}
          setDoctors={setDoctors}
          deleteDoctor={deleteDoctor}
        />
      </div>
    </div>
  );
}
