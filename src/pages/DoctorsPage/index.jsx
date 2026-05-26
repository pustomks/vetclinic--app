import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DoctorsList from "../../components/DoctorsList";

export default function DoctorsPage() {
  return (
    <div>
      <DoctorsList />
    </div>
  );
}
