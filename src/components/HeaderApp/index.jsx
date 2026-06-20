import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/slices/tokenSlice";
import { App, Button } from "antd";
import "./HeaderApp.css";
import { deleteUserRole } from "../../store/slices/roleSlice";

export default function HeaderApp() {
  const { token } = useSelector((state) => state.token);
  const { role } = useSelector((state) => state.role);
  const favorite = useSelector((state) => state.favorite);
  const dispatch = useDispatch();

  const { modal } = App.useApp();

  const handleLogout = () => {
    modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to log out of your account?",
      okText: "Logout",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        dispatch(logout());
        dispatch(deleteUserRole());
      },
    });
  };

  return (
    <nav className="header-nav">
      <div className="header-links">
        <Link to="/">Главная</Link>
        <Link to="/doctors">Врачи</Link>
        {token && role === "ADMIN" && (
          <Link to="/doctors-office">Кабинет врачей</Link>
        )}
        <Link to="/contacs">Контакты</Link>
        <Link to="/about">О нас</Link>
        {token && <Link to="/mypets">Мои питомцы</Link>}
        {token && <Link to="/favorite">Избранное({favorite.length})</Link>}
      </div>

      <div className="header-auth">
        {token && <Link to="/profile">Мой профиль</Link>}

        {token ? (
          <Button type="primary" onClick={handleLogout}>
            logout
          </Button>
        ) : (
          <Link to="/auth">Авторизоваться</Link>
        )}
      </div>
    </nav>
  );
}
