import React, { useContext } from "react";
import "../blocks/content.css";
import "../blocks/profile.css";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardDelete,
  onCardLike,
  onCardClick,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-container">
          <img
            src={currentUser.avatar}
            className="profile__image"
            alt={`Perfil : ${currentUser.name}`}
          />
          <div className="profile__overlay">
            <span
              className="profile__edit-avatar"
              onClick={onEditAvatarClick}
            ></span>
          </div>
        </div>

        <div className="profile__heading">
          <div className="profile__heading-name">
            <h1 className="profile__heading-title">{currentUser.name}</h1>
            <button
              className="profile__heading-edit"
              onClick={onEditProfileClick}
            ></button>
          </div>

          <h2 className="profile__heading-subtitle">{currentUser.about}</h2>
        </div>
        <button
          className="profile__heading-add"
          onClick={onAddPlaceClick}
        ></button>
      </section>
      <section className="cards">
        <ul className="cards__public">
          {cards.map((card) => (
            <Card
              key={card._id}
              cardData={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
