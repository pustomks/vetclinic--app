import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

function Interview({ dayNumber, interval, handleScheduleChange }) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      intervals: [{ dayOfWeek: dayNumber, startTime: "", endTime: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "intervals",
  });

  const watchIntervals = watch("intervals");

  useEffect(() => {
    if (handleScheduleChange) {
      handleScheduleChange(dayNumber, watchIntervals);
    }
  }, [watchIntervals, dayNumber, handleScheduleChange]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <input
              {...register(`intervals.${index}.dayOfWeek`, {
                required: "Day is required",
                valueAsNumber: true,
              })}
              placeholder="First Name"
              hidden
            />
            <input
              placeholder="Start Time (09:00)"
              {...register(`intervals.${index}.startTime`, {
                required: "Start time is required",
              })}
            />
            {errors.test?.[index]?.firstName && (
              <span style={{ color: "red" }}>
                {errors.test[index].firstName.message}
              </span>
            )}

            <Controller
              render={({ field }) => (
                <input {...field} placeholder="End Time (20:00)" />
              )}
              name={`intervals.${index}.endTime`}
              control={control}
              rules={{ required: "End time is required" }}
            />

            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() =>
          append({ dayOfWeek: dayNumber, startTime: "", endTime: "" })
        }
      >
        Append
      </button>
    </div>
  );
}

export default Interview;
