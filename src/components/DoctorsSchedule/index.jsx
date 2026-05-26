import React from "react";
import { WEEK_DAYS_DICTIONARY } from "../../const";

export default function DoctorsSchedule({ day, intervals }) {
  return (
    <div>
      <p>
        <span>{WEEK_DAYS_DICTIONARY[day]}: </span>
        {intervals.map((i, index) => (
          <button style={{ marginRight: "10px" }} key={index}>
            {i.from} - {i.to}
          </button>
        ))}
      </p>
    </div>
  );
}
