import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

const currentUser = useContext(CurrentUserContext);
const [name, setName] = useState('');
const [about, setAbout] = useState('');

useEffect(() => {
  setName(currentUser.name);
  setAbout(currentUser.about);
}, [currentUser, isOpen]); 

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about
    });
  } 

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Сохранение..." : "Создать"}
    >
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Имя"
        className="popup__input popup__form-subtitle popup__form-subtitle_value_name"
        minLength="2"
        maxLength="40"
        required
        defaultValue={name} 
        onChange={handleChangeName}
      />
      <span id="name-error"></span>
      <input
        type="text"
        id="job"
        name="about"
        placeholder="Кто я?"
        className="popup__input popup__form-subtitle popup__form-subtitle_value_job"
        minLength="2"
        maxLength="200"
        required
        defaultValue={about} 
        onChange={handleChangeAbout}
      />
      <span id="job-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
