import {api} from "../api/api";
import {reset} from 'redux-form';

let initialState = {
    isAuth: !!localStorage.getItem('jwt'),
    alertSuccessShow:false,
    alertErrorShow:false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_AUTH_USER_DATA": {
            return {...state, isAuth: action.status,};
        }
        case "SHOW_SUCCESS_ALERT": {
            return { ...state, alertSuccessShow: action.status };
        }
        case "SHOW_ERROR_ALERT": {
            return { ...state, alertErrorShow: action.status };
        }
        case "HIDE_SUCCESS_ALERT": {
            return { ...state, alertSuccessShow: action.status };
        }
        case "HIDE_ERROR_ALERT": {
            return { ...state, alertErrorShow: action.status };
        }
        default:
            return state;
    }
};

export const login = (email, password, rememberMe) => dispatch => {
    api.login(email, password, rememberMe)
        .then((response) => {
            console.log(response)
            localStorage.setItem('jwt', response.token);
            dispatch(setAuthUserData(true));
            dispatch(showSuccessAlert(true))
        })
        .catch((err) => {
            dispatch(showErrorAlert(true))
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

export const regUser = (name,
                        last_name,
                        middle_name,
                        gender,
                        entity_type,
                        date_of_birth,
                        email,
                        phone,
                        password) => dispatch => {
    api.regUser(name,
                last_name,
                middle_name,
                gender,
                entity_type,
                date_of_birth,
                email,
                phone,
                password)
        .then((response) => {
            console.log('getUserData response: ', response);
            dispatch(showSuccessAlert(true));
            dispatch(reset('auth'))
        })
        .catch((err) => {
            console.log(err);
            dispatch(showErrorAlert(true))
        })
}

export const setAuthUserData = (status) => ({type: "SET_AUTH_USER_DATA", status: status});

export const showSuccessAlert = (status) => ({
    type: "SHOW_SUCCESS_ALERT",
    status: status,
});

export const showErrorAlert = (status) => ({
    type: "SHOW_ERROR_ALERT",
    status: status,
});

export const hideSuccessAlert = (status) => ({
    type:"HIDE_SUCCESS_ALERT",
    status: status,
})

export const hideErrorAlert = (status) => ({
    type:"HIDE_ERROR_ALERT",
    status: status,
})


export default authReducer;
