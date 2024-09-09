import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../blocks/profile.css";
import "../blocks/popup.css";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [nameUser, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [isAboutValid, setIsAboutValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name || "");
      setDescription(currentUser.about || "");
      setIsNameValid(true);
      setIsAboutValid(true);
      setIsFormValid(false);
    }
  }, [isOpen, currentUser]);

  useEffect(() => {
    setIsFormValid(isNameValid && isAboutValid);
  }, [isNameValid, isAboutValid]);

  function handleNameProfile(e) {
    setName(e.target.value);
    setIsNameValid(e.target.validity.valid);
  }

  function handleAboutProfile(e) {
    setDescription(e.target.value);
    setIsAboutValid(e.target.validity.valid);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      nameUser,
      about: description,
    });
  }

  return (
    <>
      <PopupWithForm
        name="profile"
        title="Editar Perfil"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      >
        <input
          type="text"
          name="name"
          className={`form__input ${!isNameValid && "form__input_has_error"}`}
          placeholder="Nombre"
          value={nameUser}
          onChange={handleNameProfile}
          minLength="2"
          maxLength="40"
          required
        />
        <span className="form__input-error form__input-error_type_name">
          {!isNameValid && "El nombre debe tener entre 2 y 30 caracteres"}
        </span>
        <br />
        <input
          type="text"
          name="about"
          className={`form__input ${!isAboutValid && "form__input_has_error"}`}
          value={description}
          onChange={handleAboutProfile}
          placeholder="Acerca de mí"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="form__input-error form__input-error_type_about">
          {!isAboutValid &&
            "La Descripción debe tener entre 2 y 200 caracteres"}
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

export default EditProfilePopup;
