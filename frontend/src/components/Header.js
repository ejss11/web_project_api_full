import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import headerLogo from "../images/logo.png";
import "../blocks/header.css";

function AppHeader({ isLoggedIn, isUser, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const onMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    onLogout(); // Llama a la función de cierre de sesión
    setIsMenuOpen(false); // Cierra el menú
  };

  return (
    <header className="header">
      <div className="header__content">
        <img src={headerLogo} alt="Logo header" className="header__logo" />
        <nav className="header__nav">
          <div className="header__menu-icon" onClick={onMenuToggle}>
            {/* Alterna entre el icono de menú y cerrar */}
            {isLoggedIn ? (isMenuOpen ? "✖️" : "☰") : ""}
          </div>

          {isLoggedIn ? (
            <>
              <div
                className={`header__menu ${
                  isMenuOpen ? "header__menu--show" : ""
                }`}
              >
                <Link to="/profile" className="header__link">
                  {isUser}
                </Link>
                <Link className="header__button" onClick={handleLogout}>
                  Cerrar sesión
                </Link>
              </div>
            </>
          ) : (
            <>
              {location.pathname === "/signin" ? (
                <Link to="/signup" className="header__link">
                  Registrarse
                </Link>
              ) : (
                <Link to="/signin" className="header__link">
                  Iniciar Sesión
                </Link>
              )}
            </>
          )}
        </nav>
      </div>

      <div className="header__line"></div>
    </header>
  );
}

export default AppHeader;
