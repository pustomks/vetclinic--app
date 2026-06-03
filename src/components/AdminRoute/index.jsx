import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { USER_ROLES } from "../../const";

const AdminRoute = () => {
  const { role, loaded } = useSelector((state) => state.role);
  const { token } = useSelector((state) => state.token);
  console.log(role);
  console.log(token);

  if (!loaded) {
    return <h1>Loading</h1>;
  }
  if (role !== USER_ROLES.ADMIN) {
    return <Navigate to="/auth" replace />;
  }
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
