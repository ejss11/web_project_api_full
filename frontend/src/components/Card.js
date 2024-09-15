import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../blocks/cards.css";

function Card({ cardData, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = cardData.owner === currentUser._id;
  const cardDeleteButtonClassName = `card__image-delete ${
    isOwn ? "card__image-delete" : "card__image-delete_hidden"
  }`;

  const isLiked = cardData.likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = `card__content-like ${
    isLiked ? "card__content-like_Active" : ""
  }`;
  const handleClick = () => {
    onCardClick(cardData);
  };

  const handleLikeClick = () => {
    onCardLike(cardData);
  };

  const handleDeleteClick = () => {
    onCardDelete(cardData);
  };
  return (
    <li className="card">
      <div className="card__image">
        <img
          className="card__image-photo"
          src={cardData.link}
          alt={cardData.name}
          onClick={handleClick}
        />
        {isOwn && (
          <span
            className={cardDeleteButtonClassName}
            onClick={handleDeleteClick}
          />
        )}
      </div>
      <div className="card__content">
        <h3 className="card__content-title">{cardData.name}</h3>
        <span className={cardLikeButtonClassName} onClick={handleLikeClick}>
          <span className="card__counter">{cardData.likes.length}</span>
        </span>
      </div>
    </li>
  );
}

export default Card;
