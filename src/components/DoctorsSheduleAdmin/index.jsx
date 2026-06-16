import React from "react";
import { WEEK_DAYS_NUMBERS } from "../../const";
import Interview from "../DoctorsScheduleForms";

export default function DoctorsSheduleAdmin({
  day,
  interval,
  handleScheduleChange,
}) {
  const dayNumber = WEEK_DAYS_NUMBERS[day];
  return (
    <div>
      <span>
        День {dayNumber} ({day})
      </span>

      <Interview
        dayNumber={dayNumber}
        interval={interval}
        handleScheduleChange={handleScheduleChange}
      />
    </div>
  );
}
