import { api } from "../api/api";

let initialState = {
    chatMessages: [
        {userName: 'Владимир', time: '(07.10.2020 23:27:35)', text: 'че с деньгами?'},
        {userName: 'Дмитрий', time: '(07.10.2020 23:27:55)', text: 'Ты кому звонишь?'},
        {userName: 'Владимир', time: '(07.10.2020 23:28:15)', text: 'Тебе звоню'},
        {userName: 'Дмитрий', time: '(07.10.2020 23:28:23)', text: 'Кому?'},
        {userName: 'Владимир', time: '(07.10.2020 23:28:55)', text: 'А вот тебе вот'},
    ],
    isFetching: false,
};

const dealPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET-MESSAGES":
            return {
                ...state,
                chatMessages: [ ...action.payload ]
            };
        case "SET-NEW-MESSAGE":
            return {
                ...state,
                chatMessages: [ ...state.chatMessages, action.payload]
            };
        case "TOGGLE-IS-FETCHING": {
            return { ...state, isFetching: action.status };
        }

        default:
            return state;
    }
};

export const getMessages = () => (dispatch) => {
    dispatch(toggleIsFetching(true));
    api
        .getMessages()
        .then((response) => {
            dispatch(setMessages(response));
            dispatch(toggleIsFetching(false));
        })
        .catch((err) => {
            console.log(err);
        });
};

export const toggleIsFetching = status => ({type: "TOGGLE-IS-FETCHING", status: status });
export const setMessages = data => ({ type: "SET-NEW-MESSAGE", payload: data });

export const setNewMessage = data => ({ type: "SET-NEW-MESSAGE", payload: data }); // временно


export default dealPageReducer;
