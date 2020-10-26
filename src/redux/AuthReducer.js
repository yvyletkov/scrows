import { API } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
  userId: null,
  email: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  // debugger;
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (id, email, isAuth) => ({type: SET_USER_DATA,payload: { id, email, isAuth }});

// export const getAuthUserData = () => (dispatch) => {
//     API.me()
//     .then((response) => {
//       if (response.data.resultCode === 0) {
//         let { id, login, email } = response.data.data;
//         dispatch(setAuthUserData(id, email, login, true));
//       }
//     });
//   };

export const login = (email, password, rememberMe) => (dispatch) => {

  debugger

  API.login(email, password, rememberMe).then((response) => {
    if (response.data.resultCode === 0) {
      let { userId } = response.data.data;
      dispatch(setAuthUserData(userId, email, true));
    }
  });
};

export default authReducer;
