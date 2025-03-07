// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(cardName, cardLink, deleteFunction) { 
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteFunction);
  cardElement.querySelector('.card__title').textContent = cardName;
  cardElement.querySelector('.card__image').src = cardLink;
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const eventTarget = evt.target;
  const placesItem = eventTarget.closest('.card');
  placesItem.remove();
}

// @todo: Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++) {
  placesList.append(addCard(initialCards[i].name, initialCards[i].link, deleteCard));
}
