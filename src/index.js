import './pages/index.css';
import { initialCards } from './scripts/cards-data.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { closeModal, openModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';

// Секция профиль
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// Редактирование профиля
const popupEdit = document.querySelector('.popup_type_edit');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputDescription = document.querySelector('.popup__input_type_description');
const popupEditClose = document.querySelector('.popup_type_edit .popup__close');
const formEditProfile = document.querySelector('[name="edit-profile"]');

// Секция карточек
const placesList = document.querySelector('.places__list');

// Добавление карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupInputCardName = document.querySelector('.popup__input_type_card-name');
const popupInputUrl = document.querySelector('.popup__input_type_url');
const popupNewCardClose = document.querySelector('.popup_type_new-card .popup__close');
const formNewPlace = document.querySelector('[name="new-place"]');

// Открытая карточка
const popupImage = document.querySelector('.popup_type_image');
const popupImageClose = document.querySelector('.popup_type_image .popup__close');
const popupCaption = popupImage.querySelector('.popup__caption');
const popupImg = popupImage.querySelector('.popup__image');

// Валидация
const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible',
}

enableValidation(validationConfig);

function showCard(cardData) {
  return createCard(cardData, deleteCard, likeCard, openImagePopup);
}

initialCards.forEach((cardData) => {
  placesList.append(showCard(cardData));
});

function openImagePopup(event){
  popupCaption.textContent = event.target.parentElement.querySelector('.card__title').textContent;
  popupImg.setAttribute('src', event.target.src);
  popupImg.setAttribute('alt', event.target.alt);
  openModal(popupImage);
}

editProfileButton.addEventListener('click', function() {
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileDescription.textContent;
  openModal(popupEdit);
})

addCardButton.addEventListener('click', function() {
  openModal(popupNewCard);
});

popupEditClose.addEventListener('click', function() {
  closeModal(popupEdit);
})

popupNewCardClose.addEventListener('click', function() {
  closeModal(popupNewCard);
});

popupImageClose.addEventListener('click', function() {
  closeModal(popupImage);
})

function submitEditProfileForm(event) {
  event.preventDefault();
  const name = popupInputName.value;
  const description = popupInputDescription.value;
  profileTitle.textContent = name;
  profileDescription.textContent = description;
  closeModal(popupEdit);
  clearValidation(formEditProfile, validationConfig);
}

function submitAddCardForm(event) {
  event.preventDefault();
  const cardName = popupInputCardName.value;
  const url = popupInputUrl.value;
  placesList.prepend(showCard({name: cardName, link: url}));
  formNewPlace.reset();
  closeModal(popupNewCard);
  clearValidation(formNewPlace, validationConfig);
}

formEditProfile.addEventListener('submit', submitEditProfileForm);
formNewPlace.addEventListener('submit', submitAddCardForm);
