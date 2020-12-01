import {api} from "../api/api";
import React from "react";

let initialState = {
    addSuccess: false,
    isFetching: false,
};

const addDealPageReducer = (state = initialState, action) => {
    switch (action.type) {

        case "ADD-DEAL:SET-ADD-SUCCESS":
            return {
                ...state,
                addSuccess: true
            };

        case "ADD-DEAL:TOGGLE-IS-FETCHING": {
            return {...state, isFetching: action.status};
        }

        default:
            return state;
    }
};

export const postNewDeal = (data) => (dispatch) => {

    dispatch(toggleIsFetching(true));
    api
        .postNewDeal(data)
        .then((response) => {
            dispatch(setAddSuccess());
            dispatch(toggleIsFetching(false));
        })
        .catch((err) => {
            console.log(err);
            dispatch(toggleIsFetching(false));
        });
};

export const toggleIsFetching = status => ({type: "ADD-DEAL:TOGGLE-IS-FETCHING", status: status});
export const setAddSuccess = () => ({type: "ADD-DEAL:SET-ADD-SUCCESS"});


export default addDealPageReducer;
