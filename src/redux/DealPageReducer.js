import {api} from "../api/api";

let initialState = {
    dealId: null,
    subject: '',
    status: {},
    dealType: {},
    users: [],
    amount: null,
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
        case "DEAL:SET-DEAL-INFO":
            return {
                ...state,
                dealId: action.payload.id,
                subject: action.payload.subject,
                status: {...action.payload.status},
                dealType: {...action.payload.type},
                users: [...action.payload.users],
                amount: action.payload.amount,
            };
        case "DEAL:SET-MESSAGES":
            return {
                ...state,
                chatMessages: [...action.payload]
            };
        case "DEAL:TOGGLE-IS-FETCHING": {
            return {...state, isFetching: action.status};
        }

        default:
            return state;
    }
};

// export const getMessages = () => (dispatch) => {
//     dispatch(toggleIsFetching(true));
//     api
//         .getMessages()
//         .then((response) => {
//             dispatch(setMessages(response));
//             dispatch(toggleIsFetching(false));
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };

export const getDealInfo = (id) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    api
        .getDealInfo(id)
        .then((response) => {
            console.log(response);
            dispatch(setDealInfo(response));
            dispatch(toggleIsFetching(false));
        })
        .catch((err) => {
            console.log(err);
            dispatch(toggleIsFetching(false));
        });
};

export const toggleIsFetching = status => ({type: "DEAL:TOGGLE-IS-FETCHING", status: status});
// export const setMessages = data => ({ type: "DEAL:SET-MESSAGES", payload: data });
export const setDealInfo = data => ({type: "DEAL:SET-DEAL-INFO", payload: data});


export default dealPageReducer;
