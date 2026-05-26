import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/slices/tokenSlice";
import "./HeaderApp.css";

export default function HeaderApp() {
  const { token } = useSelector((state) => state.token);
  const favorite = useSelector((state) => state.favorite);
  const dispatch = useDispatch();

  return (
    <nav className="header-nav">
      <Link to="/">Главная</Link>
      {token && <Link to="/mypets">Мои питомцы</Link>}
      {token && <Link to="/favorite">Избранное({favorite.length})</Link>}
      <Link to="/doctors">Врачи</Link>
      {token && <Link to="/doctors-create">Добавить врача</Link>}
      <Link to="/contacs">Контакты</Link>
      <Link to="/about">О нас</Link>
      {token && <Link to="/profile">Мой профиль</Link>}

      {token ? (
        <button onClick={() => dispatch(logout())}>logout</button>
      ) : (
        <Link to="/auth">Авторизоваться</Link>
      )}
    </nav>
  );
}
