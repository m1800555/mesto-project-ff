// Функция открытия модального окна
export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closeModalByOverlay);
  document.addEventListener('keydown', closeModalEscape);
}

// Функция закрытия модального окна
export function closeModal(popup) {
	if (popup) {
		popup.classList.remove('popup_is-opened');
		popup.removeEventListener('click', closeModalByOverlay);
		document.removeEventListener('keydown', closeModalEscape);
	}
}

// Функция закрытия попапа нажатием на Escape
function closeModalEscape(event) {
	if (event.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_is-opened');
		if (openedPopup) {
			closeModal(openedPopup);
		}
	}
}

// Функция закрытия попапа кликом на оверлей
function closeModalByOverlay(event) {
	if (event.target === event.currentTarget) {
		closeModal(event.currentTarget)
	}
}
