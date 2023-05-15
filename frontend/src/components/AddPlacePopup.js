import { useState, useEffect } from "react";
// import { useFormAndValidation } from "../hooks/useFormAndValidation";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  // const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();


  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link
    });
  }

  useEffect(() => {
    setName('');
    setLink('');
}, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Сохранение..." : "Создать"}
    >
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Название"
        onChange={handleChangeName}
        value={name}
        className="popup__input popup__form-subtitle popup__form-subtitle_create popup__form-subtitle_value_title"
        minLength="2"
        maxLength="30"
        required
      />
      <span id="name-add-error"></span>
      <input
        type="url"
        id="url"
        name="link"
        placeholder="Ссылка на картинку"
        onChange={handleChangeLink}
        value={link}
        className="popup__input popup__form-subtitle popup__form-subtitle_create popup__form-subtitle_value_link"
        required
      />
      <span id="url-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
