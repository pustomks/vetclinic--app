import React from "react";
import { WEEK_DAYS_NUMBERS } from "../../const";

import DoctorsScheduleDayForms from "../DoctorsScheduleDayForms";

export default function DoctorsScheduleAdmin({
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

      <DoctorsScheduleDayForms
        dayNumber={dayNumber}
        interval={interval}
        handleScheduleChange={handleScheduleChange}
      />
    </div>
  );
}
