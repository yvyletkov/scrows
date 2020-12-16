import {api} from "../api/api";
import Swal from 'sweetalert2'


let initialState = {
    notFound: false,
    dealId: null,
    transitions: [],
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
    chatMessages: [],
    history: [],
    isFetching: false,
    chatIsFetching: false,
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
        case "DEAL:SET-DEAL-HISTORY":
            return {
                ...state,
                history: [...action.payload]
            };
        case "DEAL:SET-TRANSITIONS":
            return {
                ...state,
                transitions: [...action.payload]
            };
        case "DEAL:TOGGLE-IS-FETCHING": {
            return {...state, isFetching: action.status};
        }
        case "DEAL:TOGGLE-CHAT-IS-FETCHING": {
            return {...state, chatIsFetching: action.status};
        }


        default:
            return state;
    }
};

export const getDealInfo = (id) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    api
        .getDealInfo(id)
        .then(response => {
            if (response.detail === 'Not found.') dispatch(setNotFound(true));
            else {
                dispatch(setNotFound(false));
                dispatch(setDealInfo(response));
                dispatch(toggleIsFetching(false));
            }}
        )
        .catch((err) => {
            console.log(err);
            dispatch(toggleIsFetching(false));
        });
};

export const getMessages = (id) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    api
        .getMessages(id)
        .then((response) => {
            console.log('messages response', response);
            // if (response.detail === 'Not found.') dispatch(setNotFound(true));
            // else {
            dispatch(setMessages(response));
            dispatch(toggleIsFetching(false));
            // }
        })
        .catch((err) => {
            console.log(err);
            dispatch(toggleIsFetching(false));
        });
};

export const getHistory = (id) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    api
        .getDealHistory(id)
        .then((response) => {
            console.log('history response', response);
            // if (response.detail === 'Not found.') dispatch(setNotFound(true));
            // else {
            dispatch(setDealHistory(response));
            dispatch(toggleIsFetching(false));
            // }
        })
        .catch((err) => {
            console.log(err);
            dispatch(toggleIsFetching(false));
        });
};

export const postNewMessage = (id, messageText) => (dispatch) => {
    dispatch(toggleChatIsFetching(true));
    api
        .postNewMessage(id, messageText)
        .then((response) => {
            console.log('messages response', response);
            // if (response.detail === 'Not found.') dispatch(setNotFound(true));
            // else {
            dispatch(setMessages(response));
            dispatch(toggleIsFetching(false));
            // }
        })
        .catch((err) => {
            console.log(err);
            dispatch(toggleChatIsFetching(false));
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

export const getTransitions = (id) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    api
        .getTransitions(id)
        .then((response) => {
            console.log('actions:', response)
            dispatch(setTransitions(response));
            dispatch(toggleIsFetching(false));
        })
        .catch((err) => {
            console.log(err);
            dispatch(toggleIsFetching(false));
        });
};

export const makeTransition = (dealId, keyword) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    api
        .makeTransition(dealId, keyword)
        .then((response) => {
            dispatch(setDealInfo(response));
            dispatch(toggleIsFetching(false));
            Swal.fire({
                icon: 'success',
                title: 'Сделка успешно переведена на следующий этап',
                showConfirmButton: false,
                timer: 2000
            })
        })
        .catch((err) => {
            console.log(err);
            dispatch(toggleIsFetching(false));
        });
};


export const toggleIsFetching = status => ({type: "DEAL:TOGGLE-IS-FETCHING", status: status});
export const toggleChatIsFetching = status => ({type: "DEAL:TOGGLE-CHAT-IS-FETCHING", status: status});
export const setNotFound = status => ({type: "DEAL:SET-NOT-FOUND", status: status});
export const setMessages = data => ({type: "DEAL:SET-MESSAGES", payload: data});
export const setDealHistory = data => ({type: "DEAL:SET-DEAL-HISTORY", payload: data});
export const setDealInfo = data => ({type: "DEAL:SET-DEAL-INFO", payload: data});
export const setPossibleStatuses = data => ({type: "DEAL:SET-POSSIBLE-STATUSES", payload: data});
export const setTransitions = data => ({type: "DEAL:SET-TRANSITIONS", payload: data});


export default dealPageReducer;
