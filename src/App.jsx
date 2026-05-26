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

function App() {
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
