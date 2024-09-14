import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "../index.css";
import AppHeader from "./Header";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import api from "../utils/api";
import { checkToken } from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [isImagePopupOpen, setIsImagenPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((data) => {
          setUserEmail(data.email);
          setIsLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("jwt");
        });
    }
  }, [navigate]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getUserInfo()])
        .then(([cardsData, userInfo]) => {
          setCards(cardsData);
          setCurrentUser(userInfo);
        })
        .catch((err) => {
          console.error(`Error : ${err}`);
        });
    }
  }, [loggedIn]);

  function handleUpdateUser(userData) {
    api
      .editProfile(userData)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error Editar info Perfil: ${err}`));
  }

  function handleUpdateAvatar(avatarLink) {
    setIsLoading(true);
    api
      .updateAvatar(avatarLink)
      .then((updateUser) => {
        setCurrentUser(updateUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Error Updating avatar: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDelete(card) {
    setCardToDelete(card);
    setIsConfirmDeletePopupOpen(true);
  }

  function handleConfirmDelete() {
    if (cardToDelete) {
      setIsLoading(true);
      api
        .deleteCard(cardToDelete._id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
          closeAllPopups();
        })
        .catch((err) => {
          console.error(`Error Eliminar card: ${err}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true);
    api
      .addNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Error Agregar Nueva card: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    console.log("este es el like card: " + isLiked);
    console.log("Este es el id de la tarjeta" + card._id);
    console.log("Este es el usuario" + currentUser.name);
    let token = localStorage.getItem("jwt");
    console.log("Token recuperado es: " + token);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Error Like card: ${err}`));
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);

    navigate("/signin");
  }

  const handleLogin = (token) => {
    checkToken()
      .then((data) => {
        api.setToken(token);
        setUserEmail(data.name);
        setIsLoggedIn(true);
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleRegister = () => {
    setIsSuccess(true);
    setIsInfoTooltipOpen(true);
  };

  const handleCloseTooltip = () => {
    setIsInfoTooltipOpen(false);
  };

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsImagenPopupOpen(false);
    setCardToDelete(null);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagenPopupOpen(true);
  };

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <AppHeader
          isLoggedIn={loggedIn}
          onLogout={handleLogout}
          isUser={currentUser.name}
        />

        <Routes>
          {/* Rutas protegidas para usuarios autenticados */}
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onCardClick={handleCardClick}
                  onEditAvatarClick={() => setIsEditAvatarPopupOpen(true)}
                  onEditProfileClick={() => setIsEditProfilePopupOpen(true)}
                  onAddPlaceClick={() => setIsAddPlacePopupOpen(true)}
                  email={userEmail}
                ></Main>
              </ProtectedRoute>
            }
          />

          {/* Rutas públicas para usuarios no autenticados */}
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />

          {/* Redirige cualquier otra ruta a /signin si no está autenticado */}
          <Route
            path="*"
            element={
              <Navigate to={loggedIn ? "/around-react_es" : "/signin"} />
            }
          />
        </Routes>

        <Footer />
        {/*Popup Profile */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        {/*Popup Add Card */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        {/*Popup Edit Avatar */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        {/*Popup Confirm Delete Card */}
        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onConfirm={handleConfirmDelete}
          isLoading={isLoading}
        />
        {/*Popup Open Image */}
        {selectedCard && (
          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          ></ImagePopup>
        )}
        {/*Popup Info */}
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={handleCloseTooltip}
          isSuccess={isSuccess}
        />
        <template className="template">
          <li className="card">
            <div className="card__image">
              <img
                src={"ruta"}
                alt="imagen template"
                className="card__image-photo"
              />
              <span className="card__image-delete"></span>
            </div>
            <div className="card__content">
              <h3 className="card__content-title">{""}</h3>
              <span className="card__content-like">
                <span className="card__counter">0</span>
              </span>
            </div>
          </li>
        </template>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
