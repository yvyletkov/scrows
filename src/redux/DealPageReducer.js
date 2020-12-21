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
            user: {
                name: "",
                last_name: "",
                middle_name: "",
                gender: "",
                entity_type: "",
                date_of_birth: "",
                email: "",
                id: null
            },
            user_commission_amount: null,
            me: false,
            avatar: null,
        },
        {
            invite: {id: null, type: ""},
            role: {id: null, title: "", assigned: null},
            user: {
                name: "",
                last_name: "",
                middle_name: "",
                gender: "",
                entity_type: "",
                date_of_birth: "",
                email: "",
                id: null
            },
            user_commission_amount: null,
            me: false,
            avatar: null,
        }
    ],
    price: null,
    possibleStatuses: [],
    chatMessages: [],
    history: [],
    needsPay: false,
    payMethods: {cards: [], extra: []},
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
                price: action.payload.price,
            };
        case "DEAL:SET-PARTICIPANTS-DATA":
            return {
                ...state,
                participants: [...action.payload]
            }
        case "DEAL:SET-PARTICIPANTS-AVATARS":
            return {
                ...state,
                participants: [
                    {...state.participants[0], avatar: action.payload[0]},
                    {...state.participants[1], avatar: action.payload[1]},
                ]
            }

        case "DEAL:SET-POSSIBLE-STATUSES":
            return {
                ...state,
                possibleStatuses: [...action.payload]
            };
        case "DEAL:SET-NEEDS-PAY":
            return {
                ...state,
                needsPay: action.status
            };

        case "DEAL:SET-PAY-METHODS":
            return {
                ...state,
                payMethods: {...action.payload}
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

                console.log('DEAL INFO:', response)
                if (response.detail === 'Not found.') dispatch(setNotFound(true));
                else {
                    dispatch(setNotFound(false));
                    dispatch(setDealInfo(response));
                    dispatch(setParticipantsData(response.participants));
                    dispatch(getParticipantsAvatars(response.participants[0], response.participants[1]))
                    dispatch(toggleIsFetching(false));
                }
            }
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
            console.log('TRANSITIONS:', response)
            dispatch(setTransitions(response));
            for (let item of response) {
                if (item.keyword === 'pay') {
                    dispatch(setNeedsPay(true));
                    dispatch(getPayMethods(id));
                    break;
                }
            }
            dispatch(toggleIsFetching(false));
        })
        .catch((err) => {
            console.log(err);
            dispatch(toggleIsFetching(false));
        });
};

export const getPayMethods = (id) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    api.getPayMethods(id)
        .then((response) => {
            console.log('о привет', response)
            dispatch(setPayMethods(response));
            dispatch(toggleIsFetching(false));
        })
        .catch((err) => {
            console.log(err);
            dispatch(toggleIsFetching(false));
        });
}

export const redirectForPay = (methodId, methodType, dealId) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    api.redirectForPay(methodId, methodType, dealId)
        .then((response) => {
            window.location.href = response.redirect_link;
            dispatch(toggleIsFetching(false));
        })
        .catch((err) => {
            console.log(err);
            dispatch(toggleIsFetching(false));
        });
}

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
            });
            dispatch(getTransitions(dealId))
        })
        .catch((err) => {
            console.log(err);
            dispatch(toggleIsFetching(false));
        });
};

export const getParticipantsAvatars = (participant1, participant2) => (dispatch) => {
    let data = [];
    const req1 = api.getUserAvatar(participant1.user.id)
        .then((response) => {
            data[0] = response[response.length - 1].name
        })
        .catch((err) => {
            console.log(err);
        });
    const req2 = api.getUserAvatar(participant2.user.id)
        .then((response) => {
            data[1] = response[response.length - 1].name
        })
        .catch((err) => {
            console.log(err);
        });
    Promise.all([req1, req2]).then( () => {
        dispatch(setParticipantsAvatars(data))
    });
};

export const toggleIsFetching = status => ({type: "DEAL:TOGGLE-IS-FETCHING", status: status});
export const toggleChatIsFetching = status => ({type: "DEAL:TOGGLE-CHAT-IS-FETCHING", status: status});
export const setNotFound = status => ({type: "DEAL:SET-NOT-FOUND", status: status});
export const setMessages = data => ({type: "DEAL:SET-MESSAGES", payload: data});
export const setDealHistory = data => ({type: "DEAL:SET-DEAL-HISTORY", payload: data});
export const setDealInfo = data => ({type: "DEAL:SET-DEAL-INFO", payload: data});
export const setParticipantsAvatars = (data) => ({type: "DEAL:SET-PARTICIPANTS-AVATARS", payload: data});
export const setParticipantsData = data => ({type: "DEAL:SET-PARTICIPANTS-DATA", payload: data});
export const setPossibleStatuses = data => ({type: "DEAL:SET-POSSIBLE-STATUSES", payload: data});
export const setTransitions = data => ({type: "DEAL:SET-TRANSITIONS", payload: data});
export const setNeedsPay = status => ({type: "DEAL:SET-NEEDS-PAY", status: status});
export const setPayMethods = data => ({type: "DEAL:SET-PAY-METHODS", payload: data});


export default dealPageReducer;
