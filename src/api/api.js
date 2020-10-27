export default class Api {
  _mainApi = "http://api.scrows.ml/api";
  _headers = { "Content-Type": "application/json;charset=utf-8" };

  _getRes = async (url, params) => {
    const res = await fetch(`${this._mainApi}${url}`, params);
    if (!res.ok) {
      throw new Error(`Запрос не удался на ${url}, ошибка ${res.status}`);
    }
    return await res.json();
  };

  login = async (email, password) => {
    return await this._getRes(`/users/auth/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      }),
    });
  };

  getUserData = async() => {
    this._headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`
    return await this._getRes(`/users/test/`, {
      method: "GET",
      headers: this._headers
    })
  }
}
