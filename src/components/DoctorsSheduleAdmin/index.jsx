import React from "react";
import { WEEK_DAYS_DICTIONARY } from "../../const";

export default function DoctorsSheduleAdmin({ day, interval }) {
  const dayWeek = WEEK_DAYS_DICTIONARY[day];
  return (
    <div>
      <button>{day}</button>
      {interval.map((int, key) => (
        <span key={key}>
          {int.from} - {int.to}
        </span>
      ))}

      {/* <div>
        {interval.length === 0 ? (
          <span>Выходной</span>
        ) : (
          interval.map((slot, index) => (
            <span key={index}>
              {slot.from} — {slot.to}
            </span>
          ))
        )}
      </div> */}
    </div>
  );
}
