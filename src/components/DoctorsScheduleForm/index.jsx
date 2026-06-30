import { Button, App } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { WEEK_DAYS, WEEK_DAYS_NUMBERS } from "../../const";
import { useForm } from "react-hook-form";
import DayScheduleInterval from "../DayScheduleInterval";

function buildEmptySchedule() {
  return WEEK_DAYS.reduce((acc, elem) => {
    acc[elem] = [{ startTime: "", endTime: "" }];
    return acc;
  }, {});
}

export default function DoctorsScheduleForm({ id }) {
  const [weeklyScheduleDoctors, setWeeklyScheduleDoctors] = useState({});
  const [doctorHours, setDoctorHours] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { days: buildEmptySchedule() },
  });

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

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {WEEK_DAYS.map((day) => (
          <DayScheduleInterval
            key={day}
            day={day}
            control={control}
            register={register}
            errors={errors}
          />
        ))}
        <Button
          style={{ marginTop: "20px" }}
          htmlType="submit"
          type="dashed"
          block
        >
          Save
        </Button>
      </form>
      {/* <Button key="cancel" onClick={handleCancel}>
        Отмена
      </Button> */}

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
