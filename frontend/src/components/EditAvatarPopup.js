import React, { useRef, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import "../blocks/popup.css";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef();
  const [isLinkValid, setIsLinkValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLinkValid(true);
      setIsFormValid(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsFormValid(isLinkValid);
  }, [isLinkValid]);

  function handleLinkAvatar(e) {
    setIsLinkValid(e.target.validity.valid);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <>
      <PopupWithForm
        name="profile-image"
        title="Cambiar foto de perfil"
        isOpen={isOpen}
        onClose={onClose}
        onUpdateAvatar={handleSubmit}
        isLoading={isLoading}
      >
        <input
          type="url"
          name="url"
          className={`form__input ${!isLinkValid && "form__input_has_error"}`}
          placeholder="Enlace de la imagen de perfil"
          ref={avatarRef}
          onChange={handleLinkAvatar}
          minLength="2"
          required
        />
        <span className="form__input-error form__input-error_type_url">
          {!isLinkValid && "Introduce una URL válida"}
        </span>
        <br />
        <button type="submit" className="form__submit" disabled={!isFormValid}>
          {isLoading ? "Guardando..." : "Guardar"}
        </button>
      </PopupWithForm>
    </>
  );
}

export default EditAvatarPopup;
