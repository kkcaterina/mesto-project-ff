import { cardTemplate } from './index.js';

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

function createCard(cardName, cardLink, deleteFunction, likeFunction, showPictureFunction) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  deleteButton.addEventListener('click', deleteFunction);
  likeButton.addEventListener('click', likeFunction);
  cardImage.addEventListener('click', showPictureFunction);
  cardTitle.textContent = cardName;
  cardImage.src = cardLink;
  cardImage.alt = cardName;
  return cardElement;
}

function deleteCard(evt) {
  const eventTarget = evt.target;
  const placesItem = eventTarget.closest('.card');
  placesItem.remove();
}

function likeCard(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('card__like-button_is-active');
}

function showPicture(evt) {
  const eventTarget = evt.target;
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  popupCaption.textContent = eventTarget.alt;
  popupImage.src = eventTarget.src;
  popupImage.alt = eventTarget.alt;
}

export { initialCards, createCard, deleteCard, likeCard, showPicture };