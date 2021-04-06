import {api} from "../api/api";
import {reset} from 'redux-form';
import Swal from "sweetalert2";

let initialState = {
    isAuth: null,
    isSuccessAlertShowing: false,
    isErrorAlertShowing: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTH:SET-IS-AUTH": {
            return {...state, isAuth: action.status,};
        }
        case "AUTH:SHOW-SUCCESS-ALERT": {
            return { ...state, isSuccessAlertShowing: action.status };
        }
        case "AUTH:SHOW-ERROR-ALERT": {
            return { ...state, isErrorAlertShowing: action.status };
        }
        default:
            return state;
    }
};

export const checkIsAuth = () => dispatch => {
    api.me()
        .then((response) => {
            console.log('check is auth response:', response)
            if (response.email)
            dispatch(setIsAuth(true))
            else dispatch(setIsAuth(false))
        })
        .catch((err) => {
            console.log(err);
            dispatch(setIsAuth(false))
        })
}

export const login = (email, password, rememberMe) => dispatch => {
    api.login(email, password, rememberMe)
        .then((response) => {
            console.log(response)
            if (response.token) {
                localStorage.setItem('jwt', response.token);
                dispatch(setIsAuth(true));
            }
            else
            {
                dispatch(setShowErrorAlert(true))
                console.log('wrong email or password')
            }
        })
        .catch((err) => {

        });
};

export const logout = () => dispatch => {
    api.logout()
        .then((response) => {
            dispatch(setIsAuth(false))
        })
        .catch((err) => {
            console.log(err)
        })
}

export const requestForgotPass = (email) => dispatch => {
    api.requestForgotPass(email)
        .then((response) => {
            // if (response.status === 200)
            Swal.fire({
                icon: 'success',
                text: 'На Вашу почту направлены инструкции для восстановления пароля.',
                confirmButtonText: 'Хорошо',
            })
            // else Swal.fire({
            //         icon: 'error',
            //         text: 'Произошла ошибка при запросе на восстановление пароля',
            //         confirmButtonText: 'Хорошо',
            //     })
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
            if(response.email || response.phone) {
                dispatch(setShowErrorAlert(true));
            } else {
                dispatch(setShowSuccessAlert(true));
                dispatch(reset('auth'))
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch(setShowErrorAlert(true))
        })
}

export const setIsAuth = (status) => ({type: "AUTH:SET-IS-AUTH", status: status});

export const setShowSuccessAlert = (status) => ({
    type: "AUTH:SHOW-SUCCESS-ALERT",
    status: status,
});

export const setShowErrorAlert = (status) => ({
    type: "AUTH:SHOW-ERROR-ALERT",
    status: status,
});


export default authReducer;
