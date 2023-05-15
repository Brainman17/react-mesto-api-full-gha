import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
        avatar: avatarRef.current.value
    });
  }
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
    >
      <input
        type="url"
        id="avatar"
        ref={avatarRef}
        name="avatar"
        placeholder="Ссылка на картинку"
        className="popup__input popup__form-subtitle popup__form-subtitle_create popup__form-subtitle_value_link"
        required
      />
      <span id="avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
