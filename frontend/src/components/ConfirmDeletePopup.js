import React from "react";
import PopupWithForm from "./PopupWithForm";
import "../blocks/popup.css";

function ConfirmDeletePopup({ isOpen, onClose, onConfirm, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirm();
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="¿Estás seguro?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <button type="submit" className="form__submit" id="confirm-delete">
        {isLoading ? "Eliminando..." : "Si"}
      </button>
    </PopupWithForm>
  );
}

export default ConfirmDeletePopup;
