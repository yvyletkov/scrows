import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {},
    baseURL: 'https://alexei.alyosha'
});

export const API = {
    login (requestData) {
        return instance.post(`/endpoint1`, {requestData})
            .then(response => {
                return response.data
            })
    },
    register (requestData) {
        return instance.post(`/endpoint2`, {...requestData})
            .then(response => {
                return response.data
            })
    },
    // и т.д.
};
