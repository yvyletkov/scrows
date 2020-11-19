import {api} from "../api/api";

let initialState = {
    dealId: null,
    createdAt: null,
    subject: null,
    price: null,
    status: {},
};

const dealsDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DEALS_DATA":
            return {
                ...state,
                dealId: action.payload.id,
                subject: action.payload.subject,
                status: {...action.payload.status},
                amount: action.payload.amount,
            };
        default:
            return state;
    }
};

export const getDealsData = () => dispatch => {
    api.getDealsData()
        .then((response) => {
            dispatch(setDealsData(response));
        })
        .catch((err) => {
            console.log(err)
        });
};

export const setDealsData = (data) => ({type: "SET_DEALS_DATA", payload: data});

export default dealsDataReducer;
