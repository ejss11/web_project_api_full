/*export const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];*/

//Configuracion de clases de Formularios
/* export const fromConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: ".form__input_has_error",
  errorClass: ".form__input-error_type_",
  inputErrorSpamClass: ".form__input-error",
}; */
//Constantes
//Botones de Editar y Agregar Cards
export const buttonEdit = document.querySelector(".profile__heading-edit");
export const buttonAdd = document.querySelector(".profile__heading-add");
export const profileTitle = document.querySelector(".profile__heading-title");
export const profileSubTitle = document.querySelector(
  ".profile__heading-subtitle"
);
//Popup, formulario, perfil
export const popupProfile = document.querySelector(".popup_content_profile");
export const popupAddCard = document.querySelector(".popup_content_add-card");
//export const formProfile = popupProfile.querySelector(".form");
//export const formAddCard = popupAddCard.querySelector(".form");
/*export const inputProfileName = formProfile.querySelector(
  ".form__input[name=name]"
);
export const inputProfileAbout = formProfile.querySelector(
  ".form__input[name=about]"
);*/
export const profileNodeTitle = document.querySelector(
  ".profile__heading-title"
);
export const profileNodeSubtitle = document.querySelector(
  ".profile__heading-subtitle"
);
/*export const newPlaceNameInput = formAddCard.querySelector(
  ".form__input[name=title]"
);
export const newPlaceLinkInput = formAddCard.querySelector(
  ".form__input[name=link]"
);*/
export const cardArea = document.querySelector(".cards__public");

export const popupImage = document.querySelector(".popup_image");

export const forms = Array.from(document.querySelectorAll(".form"));
export const popupCloseButtons = Array.from(
  document.querySelectorAll(".popup__close-btn")
);

export const cardImage = document.querySelector(".card__image-photo");
export const cardTitle = document.querySelector(".card__content-title");

export const groupId = "web_es_10";
export const token = "97efebdf-3fe2-4b9f-9063-79770a806abe";
export const baseUrl = "https://around.nomoreparties.co/v1/";

export const profileNameNode = document.querySelector(
  ".profile__heading-title"
);
export const profileAboutNode = document.querySelector(
  ".profile__heading-subtitle"
);

export const profileAvatarNode = document.querySelector(".profile__image");

export const handleOriginalResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const botonEditAvatar = document.querySelector(".profile__edit-avatar");

export const popupEditAvatar = document.querySelector(
  ".popup_content_profile-image"
);
//export const formAvatar = popupEditAvatar.querySelector(".form");
/*export const inputUrlAvatar = formAvatar.querySelector(
  ".form__input[name=url]"
);
export const buttonFormAvatar = formAvatar.querySelector(".form__submit");
*/
export const popupDeleteConfirmation = document.querySelector(
  ".popup_content_delete-card"
);

export const headerMenuRemoveMobil = () => {
  const menuElement = document.querySelectorAll(".header__menu");
  menuElement.forEach((item) => {
    item.classList.remove("header__menu--show");
  });
};

/*export const buttonConfirmationDeleteId =
  popupDeleteConfirmation.querySelector(".form__submit");*/
