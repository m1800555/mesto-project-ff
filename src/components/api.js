const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-magistr-2',
  headers: {
    authorization: '6af74dd5-4585-42ce-b086-dc5d3e58fba3',
    'Content-Type': 'application/json'
  }
}

function getResponse(res) {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserApi = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  }).then(getResponse);
}

export function editProfileApi(name, about){
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    })
  }).then(getResponse);
}

export const getCardsApi = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  }).then(getResponse);
}

export function addCardApi(name, link){
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    })
  }).then(getResponse);
}

export function deleteCardApi(idCard){
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(getResponse);
}

export const setLikeApi = (cardId, isLiked) => {
  const method = isLiked ? 'DELETE' : 'PUT';
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method,
    headers: config.headers,
  }).then(getResponse)
}

export function editAvatarApi(avatar){
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    })
  }).then(getResponse)
}
