export const popupAddButtonElement = document.querySelector(
  ".profile__add-button"
);
export const popupEditButtonElement = document.querySelector(
  ".profile__edit-button"
);
export const popupAvatarButtonElement =
  document.querySelector(".profile__avatar");

export const formElementEdit = document.forms["form-edit"];
export const formElementAdd = document.forms["form-add"];
export const formElementAvatarUpdate = document.forms["form-avatar"];
export const templateSelector = "#card-template";

export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_invalid",
  inputMarginOut: "popup__input_margin_out",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
