import { Button } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../api/axios";

export default function DoctorsScheduleForm({ id }) {
  const [weeklyScheduleDoctors, setWeeklyScheduleDoctors] = useState({});
  const [doctorHours, setDoctorHours] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getWorkinghours = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/api/doctors/${id}/working-hours`);
        const data = response.data;
        setDoctorHours(data.schedule);
        console.log(data.schedule);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getWorkinghours();
  }, []);

  const doctorsSchedule = Object.entries(doctorHours);

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
    <div>
      {/* <Button key="cancel" onClick={handleCancel}>
        Отмена
      </Button> */}
      ,
      {/* <Button
        key="save"
        type="primary"
        loading={isLoading}
        onClick={handleSaveWeeklySchedule}
      >
        Сохранить расписание
      </Button> */}
    </div>
  );
}
