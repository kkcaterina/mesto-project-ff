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
    closePopup(evt.target);
  }
}

function closePopupButton(popup) {
  popup.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
}

function animatePopup(popup) {
  popup.classList.add('popup_is-animated');
}

export { openPopup, closePopup, closePopupButton, animatePopup };