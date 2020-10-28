import {api} from "../api/api";

let initialState = {
    userId: null,
    email: null,
    isAuth: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_AUTH_USER_DATA":
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export const login = (email, password, rememberMe) => dispatch => {
    api.login(email, password, rememberMe)
        .then((response) => {
            console.log('login response: ', response)
            localStorage.setItem('jwt', response.token);
            // if (response.data.resultCode === 0) {
            //   let { userId } = response.data.data;
            //   dispatch(setAuthUserData(userId, email, true));
            // }
        })
        .catch((err) => {
            console.log(err)
        });
};

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

export const setAuthUserData = (data) => ({type: "SET_AUTH_USER_DATA", payload: data});

export default authReducer;
