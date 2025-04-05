import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './card.js';
import { openPopup, closePopup, closePopupButton, animatePopup } from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const placesContainer = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const profileForm = document.forms.profile; 
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__description');
const newPlaceForm = document.forms.add;
const placeInput = newPlaceForm.elements.place;
const linkInput = newPlaceForm.elements.link;
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

animatePopup(editPopup);
animatePopup(addPopup);
animatePopup(imagePopup);

closePopupButton(editPopup);
closePopupButton(addPopup);
closePopupButton(imagePopup);

initialCards.forEach(function (item) {
  placesContainer.append(createCard(item.name, item.link, deleteCard, likeCard, showPicture));
});

editButton.addEventListener('click', function() {
  openPopup(editPopup);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

addButton.addEventListener('click', function() {
  openPopup(addPopup);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
newPlaceForm.addEventListener('submit', handlePlaceFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  nameProfile.textContent = nameValue;
  jobProfile.textContent = jobValue;
  closePopup(editPopup);
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const placeValue = placeInput.value;
  const linkValue = linkInput.value;
  placesContainer.prepend(createCard(placeValue, linkValue, deleteCard, likeCard, showPicture));
  newPlaceForm.reset();
  closePopup(addPopup);
}

function showPicture(cardName, cardLink) {
  placesContainer.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('card__image')) {
      openPopup(imagePopup);
    }
  });
  popupImageCaption.textContent = cardName;
  popupImage.src = cardLink;
  popupImage.alt = cardName;
}

export { cardTemplate };