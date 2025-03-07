// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardName, cardLink, deleteFunction) { 
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  deleteButton.addEventListener('click', deleteFunction);
  cardTitle.textContent = cardName;
  cardImage.src = cardLink;
  cardImage.alt = cardName;
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const eventTarget = evt.target;
  const placesItem = eventTarget.closest('.card');
  placesItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  placesContainer.append(createCard(item.name, item.link, deleteCard));
});
