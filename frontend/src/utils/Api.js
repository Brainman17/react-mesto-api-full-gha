class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка:( ${res.status}`);
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(this._checkResponse);
  }

  editUserInfo(name, about) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name: name,
        about: about
      }),
    }).then(this._checkResponse);
  }

  postCreateCard(name, link) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteInitialCards(_id) {
    return fetch(this._baseUrl + "/cards/" + _id, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(_id, isLiked) {
    return fetch(this._baseUrl + "/cards/" + _id + "/likes", {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then(this._checkResponse);
  }

  updateAvatar(avatar) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000"
});

export default api;