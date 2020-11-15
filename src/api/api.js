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
  baseUrl: "https://api.scrows.ml/api/v1",
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
    return this.request(`/users/auth/`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      }),
    })
        .then((response) => {
          localStorage.setItem('jwt', response.token);
          return response
        })
        .catch((err) => {
          console.log(err)
        });
  },

  async logout() {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("result");
      }, 300);
    })
        .then((response) => {
          localStorage.removeItem('jwt');
          return response
        })
        .catch((err) => {
          console.log(err)
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
    this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
    return await this.request(`/users/profile/personal/`, {
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
    return await this.request(`/users/profile/judical/single`, {
      method: "GET",
      headers: this.headers,
    });
  },

  async changeIndividualData(document_type, passport_data_number, passport_data_created, passport_data_code) {
    console.log(
        JSON.stringify({
          document_type: `${document_type}`,
          passport_data_number: `${passport_data_number}`,
          passport_data_created: `${passport_data_created}`,
          passport_data_code: `${passport_data_code}`,
        }));
    this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
    // this.headers.Authorization = `Bearer token`;
    return await this.request(`/users/profile/judical/single`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        document_type: `${document_type}`,
        passport_data_number: `${passport_data_number}`,
        passport_data_created: `${passport_data_created}`,
        passport_data_code: `${passport_data_code}`,
      }),
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

  async changeEntityData(judical_type, entity_id, entity_tin, entity_bank_account_data,entity_name) {
    console.log(
        JSON.stringify({
          judical_type: `${judical_type}`,
          entity_id: `${entity_id}`,
          entity_tin: `${entity_tin}`,
          entity_bank_account_data: `${entity_bank_account_data}`,
          entity_name: `${entity_name}`,
        }));
    this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
    // this.headers.Authorization = `Bearer token`;
    return await this.request(`/users/profile/judical/entity`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        judical_type: `${judical_type}`,
        entity_id: `${entity_id}`,
        entity_tin: `${entity_tin}`,
        entity_bank_account_data: `${entity_bank_account_data}`,
        entity_name: `${entity_name}`,
      }),
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
