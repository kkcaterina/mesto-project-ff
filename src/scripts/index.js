import '../pages/index.css';
import { initialCards, createCard, deleteCard, likeCard, showPicture } from './cards';
import { openPopup, closePopupButton, handleProfileFormSubmit, handlePlaceFormSubmit, animatePopup } from './modal.js';

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
const newPlaceForm = document.forms.add;
const placeInput = newPlaceForm.elements.place;
const linkInput = newPlaceForm.elements.link;

animatePopup(editPopup);
animatePopup(addPopup);
animatePopup(imagePopup);

initialCards.forEach(function (item) {
  placesContainer.append(createCard(item.name, item.link, deleteCard, likeCard, showPicture));
});

editButton.addEventListener('click', function() {
  openPopup(editPopup);
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  closePopupButton(editPopup);
});

addButton.addEventListener('click', function() {
  openPopup(addPopup);
  closePopupButton(addPopup);
});

placesContainer.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('card__image')) {
    openPopup(imagePopup);
    closePopupButton(imagePopup);
  }
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
newPlaceForm.addEventListener('submit', handlePlaceFormSubmit);

export { cardTemplate, nameInput, jobInput, placeInput, linkInput, newPlaceForm, editPopup, addPopup, placesContainer };