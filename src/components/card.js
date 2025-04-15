import { deleteCardApi, setLikeApi } from './api.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(cardData, userId, deleteFn, likeFn, openImagePopupFn) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  card.setAttribute('id', cardData._id);

  const cardImage = card.querySelector('.card__image');
  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('alt', cardData.name);
  cardImage.addEventListener('click', openImagePopupFn);

  card.querySelector('.card__title').textContent = cardData.name;

  const deleteButton = card.querySelector('.card__delete-button');
  if (cardData.owner._id === userId){
    deleteButton.addEventListener('click', deleteFn);
  } else {
    deleteButton.remove();
  }

  card.querySelector('.card__like-count').textContent = cardData.likes.length;

  const likeButton = card.querySelector('.card__like-button')
	likeButton.addEventListener('click', likeFn);

	const userHasLiked = cardData.likes.some(like => like._id === userId);
	if (userHasLiked) {
		likeButton.classList.add('card__like-button_is-active');
	}

  return card;
}

// Функция проставления лайка
export function likeCard(event) {
  const likeButton = event.target;
  const card = likeButton.closest('.card');
  const cardId = card.getAttribute('id');
  const likesCount = card.querySelector('.card__like-count');
	const isLiked = likeButton.classList.contains('card__like-button_is-active');

	setLikeApi(cardId, isLiked)
		.then((result) => {
      likeButton.classList.toggle('card__like-button_is-active');
			likesCount.textContent = result.likes.length;
		})
		.catch(err => console.log(err));
}

// Функция удаления карточки
export function deleteCard(event){
  const card = event.target.closest('.card');
  const cardId = card.getAttribute('id');

  deleteCardApi(cardId)
    .then((result) => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}
