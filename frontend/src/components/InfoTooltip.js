import React from "react";
import "../blocks/popup.css";
import successIcon from "../images/success-icon.svg";
import errorIcon from "../images/error-icon.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div
      className={`popup  popup_content_info ${isOpen ? "popup_is-opened" : ""}`}
    >
      <div className="popup__overlay"></div>
      <div className="popup__content">
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
        ></button>
        <div className="popup__body">
          <div className="popup__icon">
            {isSuccess ? (
              <img src={successIcon} alt="Success" />
            ) : (
              <img src={errorIcon} alt="Error" />
            )}
          </div>
          <h3 className="popup__title">
            {isSuccess
              ? "¡Correcto! Ya estás registrado."
              : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
