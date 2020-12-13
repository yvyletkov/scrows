import {api} from "../api/api";
import React from "react";

let initialState = {
    success: false,
    isFetching: false,
    newDealId: null,
};

const addDealPageReducer = (state = initialState, action) => {
    switch (action.type) {

        case "ADD-DEAL:SET-SUCCESS":
            return {
                ...state,
                success: true
            };

        case "ADD-DEAL:TOGGLE-IS-FETCHING": {
            return {...state, isFetching: action.status};
        }

        case "ADD-DEAL:SET-NEW-DEAL-ID": {
            return {...state, newDealId: action.id};
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
            dispatch(setNewDealId(response.id))
            if (data.files)
                for (const file of data.files) {
                    dispatch(postDealFiles(response.id, file))
                }
            else dispatch(setSuccess())
        })
        .catch((err) => {
            console.log(err);
            dispatch(toggleIsFetching(false));
        });
};

export const postDealFiles = (id, files) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    api
        .postDealFiles(id, files)
        .then((response) => {
            debugger
            if (response[0].file_type) dispatch(setSuccess())
            dispatch(toggleIsFetching(false));
        })
        .catch((err) => {
            console.log(err);
            dispatch(toggleIsFetching(false));
        });
}

export const toggleIsFetching = status => ({type: "ADD-DEAL:TOGGLE-IS-FETCHING", status: status});
export const setSuccess = () => ({type: "ADD-DEAL:SET-SUCCESS"});
export const setNewDealId = id => ({type: "ADD-DEAL:SET-NEW-DEAL-ID", id: id});


export default addDealPageReducer;
