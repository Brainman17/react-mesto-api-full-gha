import React, { useState, useEffect, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import api from "../utils/Api";
import "../../src/index.css";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import { Register } from "./Register";
import { Login } from "./Login";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRouteElement from "./ProtectedRoute";
import * as Auth from "./Auth.js";
import success from "../images/success.svg";
import error from "../images/error.svg";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [info, setInfo] = useState({ image: "", text: "" });
  const [email, setEmail] = useState({ email: ""});
  const [loading, setLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  const cbLogin = useCallback(async ({ email, password }) => {
    try {
      const data = await Auth.authorize(email, password);
      if (!data) {
        throw new Error("Ошибка аутентификации");
      }
      if (data.token !== undefined) {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        setEmail(email);
        navigate("/");
      }
    } catch (e) {
      console.error(e);
      setShowTooltip(true);
      ChooseInfoTooltip({
        image: error,
        text: "Что-то пошло не так! Попробуйте еще раз!",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const cbRegister = useCallback(async ({ email, password }) => {   
    try {
      const data = await Auth.register(email, password);

      if (!data.error && data !== undefined) {
        navigate("/sign-in");
        setShowTooltip(true);
        ChooseInfoTooltip({
          image: success,
          text: "Вы успешно зарегистрировались!",
        });
      } else {
        throw new Error(data.error)
      }
    } catch (e) {
        setShowTooltip(true);
        ChooseInfoTooltip({
          image: error,
          text: "Что-то пошло не так! Попробуйте еще раз!",
        });
    } finally {
      setLoading(false);
    }
  }, []);
  
  const cbTokenCheck = useCallback(async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        throw new Error("No token");
      }

      const user = await Auth.getContent(jwt);
      if (!user) {
        throw new Error("No User");
      }

      setIsLoggedIn(true);
      setEmail(user.data.email);
      navigate("/");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cbTokenCheck();
  }, []);

  const cbLogout = useCallback(() => {
    setIsLoggedIn(false);
    setEmail({ email: "" });
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch(console.log);
  }, []);

  function ChooseInfoTooltip(info) {
    setInfo({ image: info.image, text: info.text });
  }

  function handleCardDelete(card) {
    api
      .deleteInitialCards(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch(console.log);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.log);
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .editUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .updateAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    api
      .postCreateCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }

  function handleEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfile() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlace() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.link;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setShowTooltip(false);
  }

  if (loading) {
    return "Loading...";
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                isLoggedIn={isLoggedIn}
                element={
                  <Main
                    cards={cards}
                    onEditProfile={handleEditProfile}
                    onAddPlace={handleAddPlace}
                    onEditAvatar={handleEditAvatar}
                    onCardClick={handleCardClick}
                    handleCardLike={handleCardLike}
                    handleCardDelete={handleCardDelete}
                    email={email}
                    onLogout={cbLogout}
                  />
                }
              ></ProtectedRouteElement>
            }
          />
          <Route path="/sign-up" element={<Register onRegister={cbRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={cbLogin} />} />
        </Routes>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <PopupWithForm title="Вы уверены?" name="delete" buttonText="Да" />
        <InfoTooltip
          isOpen={showTooltip}
          onClose={closeAllPopups}
          info={info}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
