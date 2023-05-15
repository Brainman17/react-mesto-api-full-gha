import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, title, like, src, ...props }) {
  const currentUser = React.useContext(CurrentUserContext);
  
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `card__heart-button ${
    isLiked && "card__heart-button_active"
  }`;
  const cardDeleteButtonClassName = (
    `card__delete-button ${!isOwn ? 'card__delete-button_inactive' : ''}`
  );

  function handleCardClick() {
    props.onCardClick(card);
  }

  function handleDeleteClick() {
    props.onCardDelete(card);
  }

  function handleLikeClick() {
    props.onCardLike(card);
  }

  return (
    <article className="card">
      <img
        src={src}
        alt={title}
        className="card__image"
        onClick={handleCardClick}
      />
      {isOwn && (
        <button
          className={cardDeleteButtonClassName}
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <div className="card__wrapper">
        <h2 className="card__subtitle">{title}</h2>
        <div className="card__like-wrap">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-counter">{like.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
