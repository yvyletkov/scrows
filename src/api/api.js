import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers:  {
        'API-KEY': 'd0ce4cd8-d0d2-4152-99ad-f6e1407cb23f'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0'
});

export const API = {
    me() {
        return instance.get(`auth/me`)
    },
    login (email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe});
            // .then(response => {
            //     return response.data
            // })
    },
    register (requestData) {
        return instance.post(`/endpoint2`, {...requestData})
            .then(response => {
                return response.data
            })
    },
    // и т.д.
};
