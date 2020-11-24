import {api} from "../api/api";

let initialState = {
    notFound: false,
    dealId: null,
    createdAt: '',
    subject: '',
    status: {},
    commissionType: {},
    commissionAmount: null,
    dealType: {},
    participants: [
        {
            invite: {id: null, type: ""},
            role: {id: null, title: "", assigned: null},
            user: {name: "", last_name: "", middle_name: "", gender: "", entity_type: "", date_of_birth: "", email: ""},
            user_commission_amount: null,
            me: false
        },
        {
            invite: {id: null, type: ""},
            role: {id: null, title: "", assigned: null},
            user: {name: "", last_name: "", middle_name: "", gender: "", entity_type: "", date_of_birth: "", email: ""},
            user_commission_amount: null,
            me: false
        }
    ],
    price: null,
    possibleStatuses: [],
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
        case "DEAL:SET-NOT-FOUND":
            return {...state, notFound: action.status};
        case "DEAL:SET-DEAL-INFO":
            return {
                ...state,
                dealId: action.payload.id,
                createdAt: action.payload.created_at,
                subject: action.payload.subject,
                commissionType: action.payload.commission_type,
                commissionAmount: action.payload.commission_amount,
                status: {...action.payload.status},
                dealType: {...action.payload.type},
                participants: [...action.payload.participants],
                price: action.payload.price,
            };
        case "DEAL:SET-POSSIBLE-STATUSES":
            return {
                ...state,
                possibleStatuses: [...action.payload]
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
            console.log('Response')
            console.log('response', response);
            if (response.detail === 'Not found.') dispatch(setNotFound(true));
            else {
                dispatch(setNotFound(false));
                dispatch(setDealInfo(response));
                dispatch(toggleIsFetching(false));
            }
        })
        .catch((err) => {
            console.log('Error')
            console.log(err);
            dispatch(toggleIsFetching(false));
        });
};

export const getPossibleStatuses = () => (dispatch) => {
    dispatch(toggleIsFetching(true));
    api
        .getPossibleStatuses()
        .then((response) => {
            dispatch(setPossibleStatuses(response));
            dispatch(toggleIsFetching(false));
        })
        .catch((err) => {
            console.log(err);
            dispatch(toggleIsFetching(false));
        });
};

export const toggleIsFetching = status => ({type: "DEAL:TOGGLE-IS-FETCHING", status: status});
export const setNotFound = status => ({type: "DEAL:SET-NOT-FOUND", status: status});
// export const setMessages = data => ({ type: "DEAL:SET-MESSAGES", payload: data });
export const setDealInfo = data => ({type: "DEAL:SET-DEAL-INFO", payload: data});
export const setPossibleStatuses = data => ({type: "DEAL:SET-POSSIBLE-STATUSES", payload: data});


export default dealPageReducer;
