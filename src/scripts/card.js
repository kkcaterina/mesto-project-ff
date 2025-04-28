import { config, deleteCardOnServer, addLikeCard, deleteLikeCard } from './api.js';

  function createCard(cardTemplate, card, userId, deleteFunction, showPictureFunction) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikesCount = cardElement.querySelector('.card__likes');
  const isCardOfCurrentUser = (card.owner._id === userId);
  const isCardLiked = card.likes.some(user => user._id === userId);
  cardLikesCount.textContent = card.likes.length;
  if (isCardLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('card__like-button_is-active')) {
      unlikeCard(evt.target, card._id, cardLikesCount);
    } else {
      likeCard(evt.target, card._id, cardLikesCount);
    }
  });
  cardImage.addEventListener('click', () => showPictureFunction(card.name, card.link));
  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  if (isCardOfCurrentUser) {
    deleteButton.addEventListener('click', (evt) => {
      deleteFunction(evt.target, card._id);
    });
  } else {
    deleteButton.style.visibility = 'hidden';
  }
  return cardElement;
}

function deleteCard(deleteButton, cardId) {
  const placesItem = deleteButton.closest('.card');
  deleteCardOnServer(config, cardId)
    .then(() => {
      placesItem.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function likeCard(likeButton, cardId, cardLikesCount) {
  addLikeCard(config, cardId)
  .then((card) => {
    likeButton.classList.add("card__like-button_is-active");
    cardLikesCount.textContent = card.likes.length;
  })
  .catch((err) => {
    console.log(err);
  });
}

function unlikeCard(likeButton, cardId, cardLikesCount) {
  deleteLikeCard(config, cardId)
  .then((card) => {
    likeButton.classList.remove("card__like-button_is-active");
    cardLikesCount.textContent = card.likes.length;
  })
  .catch((err) => {
    console.log(err);
  });
}

export { createCard, deleteCard, likeCard };