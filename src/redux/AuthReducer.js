import {api} from "../api/api";
import {stopAsyncValidation, stopSubmit} from "redux-form";

let initialState = {
    isAuth: !!localStorage.getItem('jwt'),
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_AUTH_USER_DATA":
            return {
                ...state,
                isAuth: action.status,
            };
        default:
            return state;
    }
};

export const login = (email, password, rememberMe) => dispatch => {
    api.login(email, password, rememberMe)
        .then((response) => {
            console.log(response.statusCode)
            localStorage.setItem('jwt', response.token);
            dispatch(setAuthUserData(true));
        })
        .catch((err) => {
            dispatch(stopSubmit('login', {_error: 'Ошибка авторизации'}))
            dispatch(stopAsyncValidation('login', {_error: ''}))
            console.log(err)
        });
};

export const logout = () => dispatch => {
    api.logout()
        .then((response) => {
            dispatch(setAuthUserData(false))
        })
        .catch((err) => {
            console.log(err)
        })
}


export const getUserData = () => dispatch => {
    api.getUserData()
        .then((response) => {
            console.log('getUserData response: ', response)
        })
        .catch((err) => {
            console.log(err)
        })
}

export const setAuthUserData = (status) => ({type: "SET_AUTH_USER_DATA", status: status});

export default authReducer;
