import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreateDoctors from "../../components/CreateDoctors";
import DoctorsList from "../../components/DoctorsList";
import DoctorsListAdmin from "../../components/DoctorsListAdmin";
import api from "../../api/axios";

export default function DoctorsOfficePage() {
  const [doctor, setDoctor] = useState([]);
  const { token } = useSelector((state) => state.token);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editDoctors, setEditDoctors] = useState(null);

  const fetchAllDoctors = async () => {
    try {
      const response = await fetch(`/api/doctors?page=${page}&size=1`);
      const data = await response.json();
      console.log(data);
      setDoctor(data.results);
      setTotalPages(data.info.pages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllDoctors();
  }, [page]);

  const deleteDoctor = async (id) => {
    try {
      const response = await api.delete(`/api/doctors/${id}`);
      setDoctor((prev) => prev.filter((doc) => doc.id !== id));

      fetchAllDoctors();
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div>
      <div>
        <DoctorsListAdmin
          doctor={doctor}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          deleteDoctor={deleteDoctor}
        />
      </div>
      <div>
        <CreateDoctors
          fetchAllDoctors={fetchAllDoctors}
          setDoctor={setDoctor}
        />
      </div>
    </div>
  );
}
