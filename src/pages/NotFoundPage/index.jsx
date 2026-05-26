import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const [time, setTime] = useState(5);

  const timer = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    timer.current = setInterval(() => {
      console.log(1);
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer.current);
  }, []);

  useEffect(() => {
    if (time <= 0) {
      navigate("/");
    }
  }, [time]);

  return (
    <div>
      404
      <h1>{time}</h1>
    </div>
  );
}
