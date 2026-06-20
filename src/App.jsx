import { Route, Routes } from "react-router-dom";
import "./App.css";
import HeaderApp from "./components/HeaderApp";
import MainPage from "./pages/MainPage";
import ContacsPage from "./pages/ContacsPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthPage from "./pages/AuthPage";
import MyPetsPage from "./pages/MyPetsPage";
import FavoritePage from "./pages/FavoritePage";
import DoctorsPage from "./pages/DoctorsPage";
import MyProfilePage from "./pages/MyProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import MyPetPage from "./pages/MyPetPage";
import CreateDoctorsPage from "./pages/DoctorsOfficePage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserRole, startRoleLoading } from "./store/slices/roleSlice";
import AdminRoute from "./components/AdminRoute";
import DoctorsOfficePage from "./pages/DoctorsOfficePage";
import { ConfigProvider, theme, App as AntdApp } from "antd";
import api from "./api/axios";

function App() {
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }
    const checkRole = async () => {
      dispatch(startRoleLoading());
      try {
        const response = await api.get("/api/users/me");
        const { role } = response.data;
        dispatch(setUserRole(role));
        console.log(role);
      } catch (error) {
        console.log("Error checking role:", error);
      }
    };
    checkRole();
  }, [token]);

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <AntdApp>
        <>
          <HeaderApp />

          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/favorite" element={<FavoritePage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/contacs" element={<ContacsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<MyProfilePage />} />
              <Route path="/mypets" element={<MyPetsPage />} />
              <Route path="/mypets/:id" element={<MyPetPage />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/doctors-office" element={<DoctorsOfficePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
