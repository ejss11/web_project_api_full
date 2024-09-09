import React from "react";
import "../blocks/popup.css";

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_image ${isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__overlay"></div>
      <div className="popup__content">
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__image-title">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
