import {API} from "../api/api";

//создаем экшОны
export let toggleIsFetching = (status) => {return {type: 'TOGGLE-IS-FETCHING', payload: status}}; //это чтобы крутилка крутилась пока что-то грузится
export let setAuthData = (userName, token, blablabla) => {return {type: 'SET-AUTH-DATA', payload: {userName, token, blablabla}}}; //какие-то данные с серва после авторизации


const initialState = {
    someData: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET-AUTH-DATA': {
            return {
                ...state,
                ...action.payload
            }
        }
        case 'TOGGLE-IS-FETCHING': {
            return {
                ...state,
                isFetching: action.payload,
            }
        }
        default:
            return state;
    }
};

export const login = (email, password, rememberMe) => (dispatch) => { // это так называемая санка thunk (ассинхронный диспатч экшона в котором еще и можно диспатчить другие экшоны)

    dispatch(toggleIsFetching(true));

    API.login(email, password, rememberMe)
        .then(response => {
            if (true) // статус ок
                dispatch(setAuthData({response}));
            else
                console.log("Ошибка")

            dispatch(toggleIsFetching(false));
        })
};

export default reducer;
