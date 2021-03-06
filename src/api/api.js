import React from "react";

const baseApi = {
    baseUrl: "https://api.scrows.ml/api/v1",
    // baseUrl: "http://localhost:8069/api/v1",
    // baseUrl: "https://virtserver.swaggerhub.com/C67615/Scrows/1.0.5/api/v1",
    headers: {"Content-Type": "application/json;charset=utf-8"},

    async request(endpoint, params) {
        const res = await fetch(`${this.baseUrl}${endpoint}`, params);
        return await res.json();
    },
};

const authApi = {


    async requestForgotPass(email) {
        delete this.headers.Authorization;
        return await this.request(`/users/profile/security/password/reset-by-email/${email}/`, {
            method: "POST",
            headers: this.headers,
        });
    },

    async me() { // same as /user/personal/
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return await this.request(`/users/profile/personal/`, {
            method: "GET",
            headers: this.headers,
        });
    },

    async login(email, password) {
        return this.request(`/users/auth/`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                email: `${email}`,
                password: `${password}`,
            }),
        })
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
            .then((response) => {
                localStorage.removeItem('jwt');
                return response
            })
            .catch((err) => {
                console.log(err)
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
        return await this.request(`/profile/security/`, {
            method: "GET",
            headers: this.headers,
        });
    },

    async getIndividualData() {
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return await this.request(`/users/profile/judical/single/`, {
            method: "GET",
            headers: this.headers,
        });
    },

    async changeIndividualData(document_type, passport_data_number, passport_data_created, passport_data_code) {
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return await this.request(`/users/profile/judical/single/`, {
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
        return await this.request(`/users/profile/judical/entity/`, {
            method: "GET",
            headers: this.headers,
        });
    },

    async getUserData() {
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return await this.request(`/users/profile/personal/`, {
            method: "GET",
            headers: this.headers,
        });
    },

    async addUserCard(data) {
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return await this.request(`/users/profile/payment/cards/`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data),
        });
    },


    async changeEntityData(judical_type, entity_id, entity_tin, entity_bank_account_data, entity_name) {
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
        return await this.request(`/users/profile/judical/entity/`, {
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
        return await this.request(`/users/profile/payment/cards/`, {
            method: "GET",
            headers: this.headers,
        });
    },

    async takeCodeForPhone(phone) {
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return await this.request(`/users/profile/security/update-phone/initialize/`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                phone_number: `${phone}`,
            }),
        });
    },

    async sendCodeForPhone(id, code) {
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return await this.request(`/users/profile/security/update-phone/verify/`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                verification_id: `${id}`,
                code: `${code}`,
            }),
        });
    },

    async regUser(name,
                  lastName,
                  middleName,
                  gender,
                  entity_type,
                  date_of_birth,
                  email,
                  phone,
                  password) {
        return await this.request(`/users/create/`, {
            method: "POST",
            headers: {"Content-Type": "application/json;charset=utf-8"},
            body: JSON.stringify({
                name: `${name}`,
                last_name: `${lastName}`,
                middle_name: `${middleName}`,
                gender: `${gender}`,
                entity_type: `${entity_type}`,
                date_of_birth: `${date_of_birth}`,
                email: `${email}`,
                phone: `${phone}`,
                password: `${password}`
            }),
        });
    },

    async postUserFiles(file) {
        console.log('FILEEES:', file)

        const data = new FormData();
        data.append('file', file, file.name)

        return await this.request(`/media/files/user/passport/`, {
            method: "POST",
            headers: {'Authorization': `Bearer ${localStorage.getItem('jwt')}`},
            body: data,
        });
    },
    async postUserAvatar(file) {
        console.log('FILEEES:', file)

        const data = new FormData();
        data.append('file', file, file.name)

        return await this.request(`/media/files/user/avatar/`, {
            method: "POST",
            headers: {'Authorization': `Bearer ${localStorage.getItem('jwt')}`},
            body: data,
        });
    },
    async getUserAvatar(userId) {
        return await this.request(`/media/files/user/${userId}/avatar`, {
            method: "GET",
            headers: {'Authorization': `Bearer ${localStorage.getItem('jwt')}`},
        });
    },
    async resetUserPassword() {
        return await this.request('/users/profile/security/password/reset/', {
            method: "POST",
            headers: {'Authorization': `Bearer ${localStorage.getItem('jwt')}`},
        });
    },

    async verifyEmail() {
        return await this.request('/users/profile/security/verify/email/', {
            method: "POST",
            headers: {'Authorization': `Bearer ${localStorage.getItem('jwt')}`},
        });
    },

    async getScansPersonalData(userId) {
        return await this.request(`/media/files/user/${userId}/passport`, {
            method: "GET",
            headers: {'Authorization': `Bearer ${localStorage.getItem('jwt')}`},
        });
    },
};

const dealApi = {

    async getDealInfo(id) {
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return await this.request(`/deals/${id}/`, {
            method: "GET",
            headers: this.headers,
        });
    },

    async getDealHistory(id) {
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return await this.request(`/events/type/s.deal.history/entity_id/${id}/`, {
            method: "GET",
            headers: this.headers,
        });
    },

    // async postNewHistoryEvent(id, eventName) {
    //     this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
    //     return await this.request(`/events/type/s.deal.message/entity_id/${id}/`, {
    //         method: "POST",
    //         headers: this.headers,
    //         body: JSON.stringify({
    //             historyEvent: eventName,
    //         }),
    //     })
    // },


    async getPossibleStatuses() {
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return await this.request(`/common/statuses/`, {
            method: "GET",
            headers: this.headers,
        });
    },

    async getTransitions(id) {
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return await this.request(`/deals/transitions/deal/${id}/`, {
            method: "GET",
            headers: this.headers,
        });
    },

    async getPayMethods(id) {
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return await this.request(`/users/profile/payment/methods/deal/${id}/`, {
            method: "GET",
            headers: this.headers,
        });
    },

    async redirectForPay(methodId, methodType, dealId) {
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return await this.request(`/users/profile/payment/pay/deal/${dealId}/${methodType}/${methodId}/`, {
            method: "GET",
            headers: this.headers,
        });
    },

    async makeTransition(dealId, keyword) {
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;

        return await this.request(`/deals/transitions/deal/${dealId}/provide/${keyword}/`, {
            method: "POST",
            headers: this.headers,
        });
    },

    async postNewDeal(data) {
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return await this.request(`/deals/`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                participant_email: data.participantEmail,
                subject: data.subject,
                price: +data.price,
                commission_type_id: +data.whoPays,
                role_id: +data.userRole,
                deal_type_id: +data.dealType
            }),
        })
    },

    async postDealFile(id, file) {
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;

        const data = new FormData();
        data.append('file', file, file.name)

        return await this.request(`/media/files/deal/${id}/attachments/`, {
            method: "POST",
            headers: {'Authorization': `Bearer ${localStorage.getItem('jwt')}`},
            body: data,
        });
    },

    async getDealFiles(id) {
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return await this.request(`/media/files/deal/${id}/attachments/`, {
            method: "GET",
            headers: this.headers,
        });
    },

    async getDealsData() {
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return await this.request(`/deals/`, {
            method: "GET",
            headers: this.headers,
        });
    },

    async getDealsDataCompleted() {
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return await this.request(`/deals/?status=8`, {
            method: "GET",
            headers: this.headers,
        });
    },

    async getDealsDataClaim() {
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return await this.request(`/deals/?status=7`, {
            method: "GET",
            headers: this.headers,
        });
    },

    async getDealsDataAction() {
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return await this.request(`/deals/?status=6`, {
            method: "GET",
            headers: this.headers,
        });
    },
};

const chatApi = {
    async getMessages(id) {
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return await this.request(`/events/type/s.deal.message/entity_id/${id}/`, {
            method: "GET",
            headers: this.headers,
        });
    },

    async postNewMessage(id, messageText) {
        this.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return await this.request(`/events/type/s.deal.message/entity_id/${id}/`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                message: messageText,
            }),
        })
    },
}


export const api = {
    ...baseApi,
    ...authApi,
    ...dealApi,
    ...chatApi,
};

window.apiObj = api;
