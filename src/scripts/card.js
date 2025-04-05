import { cardTemplate } from './index.js';

function createCard(cardName, cardLink, deleteFunction, likeFunction, showPictureFunction) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  deleteButton.addEventListener('click', deleteFunction);
  likeButton.addEventListener('click', likeFunction);
  cardImage.addEventListener('click', () => showPictureFunction(cardName, cardLink));
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

export { createCard, deleteCard, likeCard };