import {api} from "../api/api";

let initialState = {
    deals: [],
    dealsAction: [],
    dealsClaim: [],
    dealsCompleted: [],
    isFetching: false,
    completedDeals: {},
};

const dealsDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DEALS_DATA":
            return {
                ...state,
                deals: action.payload,
            };
        case "SET_COMPLETED_DEALS_DATA":
            return {
                ...state,
                dealsCompleted: action.payload,
            };
        case "SET_CLAIM_DEALS_DATA":
            return {
                ...state,
                dealsClaim: action.payload,
            };
        case "SET_ACTION_DEALS_DATA":
            return {
                ...state,
                dealsAction: action.payload,
            };
        case "TOGGLE-IS-FETCHING": {
            return {...state, isFetching: action.status};
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

export const getDealsDataCompleted = () => dispatch => {
    dispatch(toggleIsFetching(true));
    api.getDealsDataCompleted()
        .then((response) => {
            dispatch(setCompletedDealsData(response));
            dispatch(toggleIsFetching(false));
        })
        .catch((err) => {
            console.log(err)
        });
};

export const getDealsDataClaim = () => dispatch => {
    dispatch(toggleIsFetching(true));
    api.getDealsDataClaim()
        .then((response) => {
            dispatch(setClaimDealsData(response));
            dispatch(toggleIsFetching(false));
        })
        .catch((err) => {
            console.log(err)
        });
};

export const getDealsDataAction = () => dispatch => {
    dispatch(toggleIsFetching(true));
    api.getDealsDataAction()
        .then((response) => {
            dispatch(setActionDealsData(response));
            dispatch(toggleIsFetching(false));
        })
        .catch((err) => {
            console.log(err)
        });
};

export const setDealsData = (data) => ({type: "SET_DEALS_DATA", payload: data});
export const setActionDealsData = (data) => ({type: "SET_ACTION_DEALS_DATA", payload: data});
export const setClaimDealsData = (data) => ({type: "SET_CLAIM_DEALS_DATA", payload: data});
export const setCompletedDealsData = (data) => ({type: "SET_COMPLETED_DEALS_DATA", payload: data});
export const toggleIsFetching = (status) => ({
    type: "TOGGLE-IS-FETCHING",
    status: status,
});

export default dealsDataReducer;
