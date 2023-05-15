import { useContext } from "react";
import Card from "./Card";
import Header from "./Header";
import Footer from "./Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  handleCardLike,
  handleCardDelete,
  email,
  onLogout,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header>
        <div>
          <p className="header__menu-item header__menu-email">{email}</p>
          <button className="header__menu-item" onClick={onLogout}>
            Выйти
          </button>
        </div>
      </Header>
      <main className="page__content">
        <section className="profile page__profile">
          <div className="profile__avatar-wrap">
            <img
              src={currentUser.avatar}
              alt="Аватар"
              name="avatar"
              className="profile__avatar"
              onClick={onEditAvatar}
            />
          </div>
          <div className="profile__info">
            <div className="profile__wrapper">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                onClick={onEditProfile}
              ></button>
            </div>
            <h2 className="profile__subtitle">{currentUser.about}</h2>
          </div>
          <button
            className="profile__add-button"
            type="button"
            onClick={onAddPlace}
          ></button>
        </section>
        <section className="cards page__cards" aria-label="Блок с карточками">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                src={card.link}
                title={card.name}
                like={card.likes}
                onCardClick={onCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;
