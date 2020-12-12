import {api} from "../api/api";
import {reset} from 'redux-form';

let initialState = {
    isAuth: false,
    alertSuccessShow:false,
    alertErrorShow:false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTH:SET-IS-AUTH": {
            return {...state, isAuth: action.status,};
        }
        case "AUTH:SHOW-SUCCESS-ALERT": {
            return { ...state, alertSuccessShow: action.status };
        }
        case "AUTH:SHOW-ERROR-ALERT": {
            return { ...state, alertErrorShow: action.status };
        }
        case "AUTH:HIDE-SUCCESS-ALERT": {
            return { ...state, alertSuccessShow: action.status };
        }
        case "AUTH:HIDE-ERROR-ALERT": {
            return { ...state, alertErrorShow: action.status };
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
            localStorage.setItem('jwt', response.token);
            dispatch(setIsAuth(true));
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
            dispatch(setIsAuth(false))
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

export const setIsAuth = (status) => ({type: "AUTH:SET-IS-AUTH", status: status});

export const showSuccessAlert = (status) => ({
    type: "AUTH:SHOW-SUCCESS-ALERT",
    status: status,
});

export const showErrorAlert = (status) => ({
    type: "AUTH:SHOW-ERROR-ALERT",
    status: status,
});

export const hideSuccessAlert = (status) => ({
    type:"AUTH:HIDE-SUCCESS-ALERT",
    status: status,
})

export const hideErrorAlert = (status) => ({
    type:"AUTH:HIDE-ERROR-ALERT",
    status: status,
})


export default authReducer;
