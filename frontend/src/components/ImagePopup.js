import React from "react";

function ImagePopup({card, onClose}) {
  return (
    <section className={`popup popup_card ${card.link ? "popup_opened" : ""}`}>
      <div className="popup__card-wrap">
        <figure className="popup__card-figure">
          <button
            onClick={onClose}
            className="popup__close-button popup__close-button_card"
            type="button"
          ></button>
          <img className="popup__card-img" src={card.link} alt={card.name} />
          <figcaption className="popup__card-subtitle">{card.name}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;
