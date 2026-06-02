import { useSelector } from "react-redux";

import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminRoute = () => {
  const { role } = useSelector((state) => state.role);
  console.log(role);

  if (!role) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
