import React, { useState, useCallback } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

export const Login = ({ onLogin }) => {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
    },
    [userData]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onLogin(userData);
    },
    [onLogin, userData]
  );

  return (
    <>
      <Header className="header__wrap">
        <Link to="/sign-up" className="header__menu-item">
          Регистрация
        </Link>
      </Header>
      <h2 className="homepage__heading">Вход</h2>
      <form name="Вход" className="homepage__form" onSubmit={handleSubmit}>
        <div className="homepage__container">
          <input
            value={userData.email}
            onChange={handleChange}
            required
            minLength="1"
            maxLength="30"
            type="text"
            name="email"
            placeholder="Email"
            className="homepage__input homepage__input_email"
          />
        </div>
        <div className="homepage__container">
          <input
            value={userData.password}
            onChange={handleChange}
            required
            type="password"
            name="password"
            placeholder="Пароль"
            className="homepage__input homepage__input_password"
          />
        </div>
        <button
          type="submit"
          aria-label="Кнопка входа"
          className="homepage__button"
        >
          Войти
        </button>
      </form>
    </>
  );
};
