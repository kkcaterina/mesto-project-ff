import '../pages/index.css';
import { createCard, deleteCard } from './card.js';
import { openPopup, closePopup, closePopupButton, animatePopup } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { config, getUser, getCards, changeProfile, changeAvatar, addNewCard } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;
const placesContainer = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const imageButton = document.querySelector('.profile__edit-image-button');
const submitButtonSaveText = 'Сохранить';
const submitButtonLoadingText = 'Сохранение...';
const editPopup = document.querySelector('.popup_type_edit');
const avatarPopup = document.querySelector('.popup_type_avatar');
const addPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const profileForm = document.forms.profile; 
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__description');
const avatarForm = document.forms.avatar;
const avatarInput = avatarForm.elements.link;
const newPlaceForm = document.forms.add;
const placeInput = newPlaceForm.elements.place;
const linkInput = newPlaceForm.elements.link;
const imageProfile = document.querySelector('.profile__image');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
let currentUser;

animatePopup(editPopup);
animatePopup(addPopup);
animatePopup(imagePopup);
animatePopup(avatarPopup);

closePopupButton(editPopup);
closePopupButton(addPopup);
closePopupButton(imagePopup);
closePopupButton(avatarPopup);

editButton.addEventListener('click', function() {
  openPopup(editPopup);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  clearValidation(profileForm, validationSettings);
});

addButton.addEventListener('click', function() {
  clearValidation(newPlaceForm, validationSettings);
  openPopup(addPopup);
});

imageButton.addEventListener('click', function() {
  clearValidation(avatarForm, validationSettings);
  openPopup(avatarPopup);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
newPlaceForm.addEventListener('submit', handlePlaceFormSubmit);
avatarForm.addEventListener('submit', handleAvatarFormSubmit);
enableValidation(validationSettings);

Promise.all([getUser(config), getCards(config)])
  .then(([user, cardsArray]) => {
    currentUser = user;
    showProfile();
    cardsArray.forEach(function (card) {
      placesContainer.append(createCard(cardTemplate, card, user._id, deleteCard, showPicture));
    })
  })
  .catch((err) => {
    console.log(err);
  });

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  const submitButton = evt.submitter;
  submitButton.textContent = submitButtonLoadingText;
  changeProfile(config, nameValue, jobValue)
    .then((data) => {
      nameProfile.textContent = data.name;
      jobProfile.textContent = data.about;
      closePopup(editPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = submitButtonSaveText;
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatarValue = avatarInput.value;
  const submitButton = evt.submitter;
  submitButton.textContent = submitButtonLoadingText;
  changeAvatar(config, avatarValue)
    .then((data) => {
      imageProfile.style.backgroundImage = `url(${data.avatar})`;
      avatarForm.reset();
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = submitButtonSaveText;
    });
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const placeValue = placeInput.value;
  const linkValue = linkInput.value;
  const submitButton = evt.submitter;
  submitButton.textContent = submitButtonLoadingText;
  addNewCard(config, placeValue, linkValue)
    .then((newCard) => {
      placesContainer.prepend(createCard(cardTemplate, newCard, currentUser._id, deleteCard, showPicture));
      newPlaceForm.reset();
      closePopup(addPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = submitButtonSaveText;
    });
}

function showPicture(cardName, cardLink) {
  openPopup(imagePopup);
  popupImageCaption.textContent = cardName;
  popupImage.src = cardLink;
  popupImage.alt = cardName;
}

function showProfile() {
  nameProfile.textContent = currentUser.name;
  jobProfile.textContent = currentUser.about;
  imageProfile.style.backgroundImage = `url(${currentUser.avatar})`;
}