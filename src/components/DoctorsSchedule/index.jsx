import React from "react";
import { WEEK_DAYS_DICTIONARY } from "../../const";
import { Button } from "antd";

export default function DoctorsSchedule({ day, intervals }) {
  return (
    <div>
      <p>
        <span>{WEEK_DAYS_DICTIONARY[day]}: </span>
        {intervals.map((i, index) => (
          <Button size="medium" type="dashed" key={index}>
            {i.from} - {i.to}
          </Button>
        ))}
      </p>
    </div>
  );
}
