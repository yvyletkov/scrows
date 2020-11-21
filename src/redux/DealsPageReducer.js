import {api} from "../api/api";

let initialState = {
    deals: [],
    isFetching: false,
};

const dealsDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DEALS_DATA":
            return {
                ...state,
                deals: action.payload,
            };
        case "TOGGLE-IS-FETCHING": {
            return { ...state, isFetching: action.status };
        }
        default:
            return state;
    }
};

export const getDealsData = () => dispatch => {
    dispatch(toggleIsFetching(true));
    api.getDealsData()
        .then((response) => {
            dispatch(setDealsData(response));
            dispatch(toggleIsFetching(false));
        })
        .catch((err) => {
            console.log(err)
        });
};

export const setDealsData = (data) => ({type: "SET_DEALS_DATA", payload: data});
export const toggleIsFetching = (status) => ({
    type: "TOGGLE-IS-FETCHING",
    status: status,
});

export default dealsDataReducer;
