import './pages/index.css';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { closeModal, openModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserApi, editProfileApi, getCardsApi, addCardApi, editAvatarApi } from './components/api.js';

// Секция профиль
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// Редактирование профиля
const popupProfileEdit = document.querySelector('.popup_type_edit_profile');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputDescription = document.querySelector('.popup__input_type_description');
const popupProfileClose = document.querySelector('.popup_type_edit_profile .popup__close');
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

// Аватар
const profileAvatar = document.querySelector('.profile__image');
const profileAvatarEdit = document.querySelector('.profile__image-edit');
const popupAvatar = document.querySelector('.popup_type_edit_avatar');
const popupInputAvatarUrl = document.querySelector('.popup__input_type_avatar_url');
const popupAvatarClose = document.querySelector('.popup_type_edit_avatar .popup__close');
const formEditAvatar = document.querySelector('[name="edit-avatar"]');

// Валидация
const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible',
}

let userId = null;

enableValidation(validationConfig);

function showCard(cardData, userId) {
  return createCard(cardData, userId, deleteCard, likeCard, openImagePopup);
}

function openImagePopup(event){
  popupCaption.textContent = event.target.parentElement.querySelector('.card__title').textContent;
  popupImg.setAttribute('src', event.target.src);
  popupImg.setAttribute('alt', event.target.alt);
  openModal(popupImage);
}

editProfileButton.addEventListener('click', function() {
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(popupProfileEdit);
});

addCardButton.addEventListener('click', function() {
  clearValidation(formNewPlace, validationConfig);
  openModal(popupNewCard);
});

profileAvatarEdit.addEventListener('click', function() {
  clearValidation(formEditAvatar, validationConfig);
  openModal(popupAvatar);
});

popupProfileClose.addEventListener('click', function() {
  closeModal(popupProfileEdit);
});

popupNewCardClose.addEventListener('click', function() {
  closeModal(popupNewCard);
});

popupImageClose.addEventListener('click', function() {
  closeModal(popupImage);
});

popupAvatarClose.addEventListener('click', function() {
  closeModal(popupAvatar);
});

function submitEditProfileForm(event) {
  event.preventDefault();
  const name = popupInputName.value;
  const description = popupInputDescription.value;
  const submitButton = formEditProfile.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';

  editProfileApi(name, description).then((userData) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    closeModal(popupProfileEdit);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    submitButton.textContent = 'Сохранить';
  });
}

function submitAddCardForm(event) {
  event.preventDefault();
  const cardName = popupInputCardName.value;
  const url = popupInputUrl.value;
  const submitButton = formNewPlace.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';

  addCardApi(cardName, url)
    .then((cardData) => {
      placesList.prepend(showCard(cardData, userId));
      formNewPlace.reset();
      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
}

function submitEditAvatarForm(event){
  event.preventDefault();
  const url = popupInputAvatarUrl.value;
  const submitButton = formEditAvatar.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';

  editAvatarApi(url)
    .then((avatarData) => {
      profileAvatar.style.backgroundImage = `url(${avatarData.avatar})`;
      formEditAvatar.reset();
      closeModal(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    })
}

formEditProfile.addEventListener('submit', submitEditProfileForm);
formNewPlace.addEventListener('submit', submitAddCardForm);
formEditAvatar.addEventListener('submit', submitEditAvatarForm);

Promise.all([getUserApi(), getCardsApi()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    initialCards.forEach(cardData => {
      placesList.append(showCard(cardData, userId));
    })
  })
  .catch(error => console.log(error))
