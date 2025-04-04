import { nameInput, jobInput, editPopup, addPopup, placeInput, linkInput, newPlaceForm, placesContainer } from './index.js';
import { createCard, deleteCard, likeCard, showPicture } from './cards';

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('click', closePopupOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEsc);
  popup.removeEventListener('click', closePopupOverlay);
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

function closePopupOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

function closePopupButton(popup) {
  popup.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  const nameProfile = document.querySelector('.profile__title');
  const jobProfile = document.querySelector('.profile__description');
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

function animatePopup(popup) {
  popup.classList.add('popup_is-animated');
}

export { openPopup, closePopupButton, handleProfileFormSubmit, handlePlaceFormSubmit, animatePopup };