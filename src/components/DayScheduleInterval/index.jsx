import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { TimePicker, Button, Tooltip, App } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { WEEK_DAYS_DICTIONARY } from "../../const";
import styles from "./DayScheduleInterval.module.css";

export default function DayScheduleInterval({
  day,
  control,
  register,
  errors,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `days.${day}`,
  });
  return (
    <div className={styles.mainContainer}>
      <h3 className={styles.dayTitle}>{WEEK_DAYS_DICTIONARY[day]}</h3>

      {fields.map((field, index) => (
        <div key={field.id} className={styles.inputAndButton}>
          <div className={styles.formInput}>
            <Controller
              control={control}
              name={`days.${day}.${index}.startTime`}
              rules={{ required: "Обязательное поле" }}
              render={({ field: { onChange, value } }) => (
                <TimePicker
                  format="HH:mm:ss"
                  value={value}
                  onChange={onChange}
                  className={styles.timePicker}
                  placeholder="Start time"
                  status={
                    errors?.days?.[day]?.[index]?.startTime ? "error" : ""
                  }
                />
              )}
            />
            {errors?.days?.[day]?.[index]?.startTime && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {errors.days[day][index].startTime.message}
              </div>
            )}
          </div>
          <div className={styles.formInput}>
            <Controller
              control={control}
              name={`days.${day}.${index}.endTime`}
              rules={{ required: "Обязательное поле" }}
              render={({ field: { onChange, value } }) => (
                <TimePicker
                  format="HH:mm:ss"
                  value={value}
                  onChange={onChange}
                  className={styles.timePicker}
                  placeholder="End time"
                  status={errors?.days?.[day]?.[index]?.endTime ? "error" : ""}
                />
              )}
            />
            {errors?.days?.[day]?.[index]?.endTime && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {errors.days[day][index].endTime.message}
              </div>
            )}
          </div>
          <Tooltip title="Delete interval">
            <Button type="primary" danger onClick={() => remove(index)}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </div>
      ))}
      <div className={styles.buttonInterval}>
        <Tooltip title="Add interval">
          <Button
            type="default"
            block
            onClick={() => append({ startTime: null, endTime: null })}
          >
            <PlusOutlined />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
