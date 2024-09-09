import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import "../blocks/popup.css";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [isLinkValid, setIsLinkValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setName("");
    setLink("");
    setIsNameValid(true);
    setIsLinkValid(true);
    setIsFormValid(false);
  }, [isOpen]);

  useEffect(() => {
    setIsFormValid(isNameValid && isLinkValid);
  }, [isNameValid, isLinkValid]);

  function handleNameChange(e) {
    setName(e.target.value);
    setIsNameValid(e.target.validity.valid);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
    setIsLinkValid(e.target.validity.valid);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isFormValid) {
      onAddPlace({ name, link });
    }
  }

  return (
    <>
      <PopupWithForm
        name="add-card"
        title="Nuevo Lugar"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      >
        <input
          type="text"
          name="title"
          className={`form__input ${!isNameValid && "form__input_has_error"}`}
          placeholder="Titulo"
          value={name}
          onChange={handleNameChange}
          minLength="2"
          maxLength="30"
          required
        />
        <span className="form__input-error form__input-error_type_title">
          {!isNameValid && "El nombre debe tener más 2 caracteres"}
        </span>
        <br />
        <input
          type="url"
          name="link"
          className={`form__input ${!isLinkValid && "form__input_has_error"}`}
          placeholder="Enlace de la imagen"
          value={link}
          onChange={handleLinkChange}
          minLength="2"
          required
        />
        <span className="form__input-error form__input-error_type_link">
          {!isLinkValid && "Introduce una URL válida"}
        </span>
        <br />
        <button
          type="submit"
          className={`form__submit ${!isFormValid && "form__submit_disabled"}`}
          disabled={!isFormValid}
        >
          {isLoading ? "Guardando..." : "Guardar"}
        </button>
      </PopupWithForm>
    </>
  );
}

export default AddPlacePopup;
