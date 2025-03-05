// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const placesList = document.querySelector('.places__list');

// Функция создания карточки
function createCard(cardData, deleteFn) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('alt', cardData.name);

  card.querySelector('.card__title').textContent = cardData.name;

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteFn);
  deleteButton.targetElement = card;

  return card;
}

// Функция удаления карточки
function deleteCard(event) {
  event.currentTarget.targetElement.remove();
}

// Вывести карточки на страницу
initialCards.forEach((cardData) => {
  card = createCard(cardData, deleteCard);
  placesList.append(card);
});

