// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(cardData, deleteFn, likeFn, openImagePopupFn) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('alt', cardData.name);
  cardImage.addEventListener('click', openImagePopupFn)

  card.querySelector('.card__title').textContent = cardData.name;

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteFn);

  card.querySelector('.card__like-button').addEventListener('click', likeFn);

  return card;
}

// Функция удаления карточки
export function deleteCard(event) {
  const card = event.target.closest('.card');
  card.remove();
}

// Функция проставления лайка
export function likeCard(event){
  event.target.classList.toggle('card__like-button_is-active')
}
