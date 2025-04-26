const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-37',
  headers: {
    authorization: 'fa731a0e-c98b-4abc-8a55-d77d727f521a',
    'Content-Type': 'application/json'
  }
};

function getUser(config) { 
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => checkResponse(res))
}

function getCards(config) { 
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => checkResponse(res))
}

function changeProfile(config, newName, newJob) { 
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newJob
    })
  })
  .then(res => checkResponse(res))
}

function changeAvatar(config, newLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newLink
    })
  })
  .then(res => checkResponse(res))
}

function addNewCard(config, newName, newLink) { 
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      link: newLink
    })
  })
  .then(res => checkResponse(res))
}

function deleteCardOnServer(config, cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers})
  .then(res => checkResponse(res))
}

function addLikeCard(config, cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers})
  .then(res => checkResponse(res))
}

function deleteLikeCard(config, cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers})
  .then(res => checkResponse(res))
}

function checkResponse(res) {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export { config, getUser, getCards, changeProfile, changeAvatar, addNewCard, deleteCardOnServer, addLikeCard, deleteLikeCard };