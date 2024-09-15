import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import "../blocks/register.css";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .register(email, password)
      .then((res) => {
        if (res._id) {
          setEmail("");
          setPassword("");
          setIsSuccess(true);
          setIsInfoTooltipOpen(true);
          onRegister(); // Mostrar mensaje de éxito en App.js
          navigate("/signin"); // Redirige a la pantalla de inicio de sesión
        }
      })
      .catch((err) => {
        setErrorMessage("Error en el registro. Intente nuevamente.");
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleCloseTooltip = () => {
    setIsInfoTooltipOpen(false);
  };
  return (
    <div className="register">
      <h2 className="register__title">Regístrate</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          className="form__input-register"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="form__input-register"
          required
        />
        <button type="submit" className="form__submit">
          Registrate
        </button>
        {
          errorMessage && (
            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              onClose={handleCloseTooltip}
              isSuccess={isSuccess}
            />
          )

          /* <p className="error-message">{errorMessage}</p> */
        }
      </form>
      <div className="register__signin">
        <p>
          ¿Ya eres miembro?{" "}
          <Link className="register__signin-link" to="/signin">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
