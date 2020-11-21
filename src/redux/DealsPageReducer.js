import {api} from "../api/api";

let initialState = {
    deals: []
};

const dealsDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DEALS_DATA":
            return {
                ...state,
                deals: action.payload,
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
