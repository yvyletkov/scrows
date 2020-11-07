import { api } from "../api/api";

let initialState = {
  last_name: null,
  name: null,
  middle_name: null,
  date_of_birth: null,
  gender: null,
  avatar: null,
  entity_type: null,
};

const personalAreaReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const getUserData = () => (dispatch) => {
  api
    .getUserData()
    .then((response) => {
      dispatch(setUserData(response));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const changeUserData = (middle_name, last_name, name, date_of_birth, entity_type, gender) => (dispatch) => {
  api
    .changeUserData(middle_name, last_name, name, date_of_birth, entity_type, gender)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setUserData = (data) => ({ type: "SET_USER_DATA", payload: data });

export default personalAreaReducer;
