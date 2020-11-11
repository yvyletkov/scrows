export class Api {
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

  getUserData = async () => {
    this._headers.Authorization = `Bearer ${localStorage.getItem("jwt")}`;
    return await this._getRes(`/users/test/`, {
      method: "GET",
      headers: this._headers,
    });
  };
}

// = = = = = = == == = = = == == ==  = = == ==

const baseApi = {
  baseUrl: "http://api.scrows.ml/api/v1",
  // baseUrl: "https://virtserver.swaggerhub.com/C67615/Scrows/1.0.2/api/v1",
  headers: { "Content-Type": "application/json;charset=utf-8" },

  async request(endpoint, params) {
    const res = await fetch(`${this.baseUrl}${endpoint}`, params);
    if (!res.ok) {
      throw new Error(`Запрос не удался на ${endpoint}, ошибка ${res.status}`);
    }
    return await res.json();
  },
};

const authApi = {
  async login(email, password) {
    return await this.request(`/users/auth/`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      }),
    });
  },

  async getUserData() {
    this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
    // this.headers.Authorization = `Bearer token`;
    return await this.request(`/users/profile/personal/`, {
      method: "GET",
      headers: this.headers,
    });
  },

  async changeUserData(
    middle_name,
    last_name,
    name,
    date_of_birth,
    entity_type,
    gender
  ) {
    console.log(
      JSON.stringify({
        middle_name: `${middle_name}`,
        last_name: `${last_name}`,
        name: `${name}`,
        date_of_birth: `${date_of_birth}`,
        entity_type: `${entity_type}`,
        gender: `${gender}`,
      })
    );
    this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
    // this.headers.Authorization = `Bearer token`;
    return await this.request(`/profile/personal/`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        middle_name: `${middle_name}`,
        last_name: `${last_name}`,
        name: `${name}`,
        date_of_birth: `${date_of_birth}`,
        entity_type: `${entity_type}`,
        gender: `${gender}`,
      }),
    });
  },

  async getSecureData() {
    this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
    // this.headers.Authorization = `Bearer token`;
    return await this.request(`/users/profile/security/`, {
      method: "GET",
      headers: this.headers,
    });
  },

  async getIndividualData() {
    this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
    // this.headers.Authorization = `Bearer token`;
    return await this.request(`/users/profile/judical/single`, {
      method: "GET",
      headers: this.headers,
    });
  },

  async getEntityData() {
    this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
    // this.headers.Authorization = `Bearer token`;
    return await this.request(`/users/profile/judical/entity`, {
      method: "GET",
      headers: this.headers,
    });
  },
  async getPaymentData() {
    this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
    // this.headers.Authorization = `Bearer token`;
    return await this.request(`/users/profile/payment/`, {
      method: "GET",
      headers: this.headers,
    });
  },
};

export const api = {
  ...baseApi,
  ...authApi,
};

window.apiObj = api;
