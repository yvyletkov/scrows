import {api} from "../api/api";

let initialState = {
    isAuth: !!localStorage.getItem('jwt'),
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_AUTH_USER_DATA":
            return {
                ...state,
                isAuth:action.status,
            };
        default:
            return state;
    }
};

export const login = (email, password, rememberMe) => dispatch => {
    api.login(email, password, rememberMe)
        .then((response) => {
            dispatch(setAuthUserData(true));
        })
        .catch((err) => {
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
    // dispatch(setAuthUserData(data))

}

export const setAuthUserData = (status) => ({type: "SET_AUTH_USER_DATA", status: status});

export default authReducer;
