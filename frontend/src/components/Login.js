import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
import "../blocks/login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("este es el correo: " + email);
    console.log("este es mi password: " + password);
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setIsSuccess(true);
          setIsInfoTooltipOpen(true);
          onLogin(data.token); // Actualiza el estado de autorización en App.js
          navigate("/"); // Redirige a la página principal
        }
      })
      .catch((err) => {
        setErrorMessage("Error de autorización. Intente nuevamente.");
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleCloseTooltip = () => {
    setIsInfoTooltipOpen(false);
  };

  return (
    <div className="login">
      <h2 className="login__title">Inicia sesión</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form__input-login"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form__input-login"
          required
        />
        <div className="form__error">
          {
            errorMessage && (
              <InfoTooltip
                isOpen={isInfoTooltipOpen}
                onClose={handleCloseTooltip}
                isSuccess={isSuccess}
              />
            )
            /* <p className="form__error-message">{errorMessage}</p> */
          }
        </div>
        <button type="submit" className="form__submit">
          Inicia sesión
        </button>
      </form>
      <div className="login__signup">
        <p>
          ¿Aún no eres miembro?{" "}
          <Link className="login__signup-link" to="/signup">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
