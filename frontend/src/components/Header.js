import React from "react";
import logo from "../../src/images/logo.svg";

function Header({ children }) {


  return (
    <header className="header page__header">
      <img src={logo} alt="Логотип" className="header__logo" />
      { children }
    </header>
  );
}

export default Header;
