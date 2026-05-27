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
import CreateDoctorsPage from "./pages/CreateDoctorsPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserRole } from "./store/slices/roleSlice";

function App() {
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }
    const checkRole = async () => {
      try {
        const response = await fetch("/api/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("error");
        }
        const { role } = await response.json();
        dispatch(setUserRole(role));
        console.log(role);
      } catch (error) {
        console.log(error);
      }
    };
    checkRole();
  }, [token]);

  return (
    <>
      <HeaderApp />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/contacs" element={<ContacsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/doctors-create" element={<CreateDoctorsPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<MyProfilePage />} />
          <Route path="/mypets" element={<MyPetsPage />} />
          <Route path="/mypets/:id" element={<MyPetPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
