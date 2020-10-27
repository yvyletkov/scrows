import Api from "../api/Api";

const SET_USER_DATA = "SET_USER_DATA";
const API = new Api();

let initialState = {
  userId: null,
  email: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
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

export const setAuthUserData = (userId, email, isAuth) => ({type: SET_USER_DATA,payload: { userId, email, isAuth }});

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
  API.login(email, password, rememberMe)
    .then((response) => {
      console.log(response)
      localStorage.setItem('jwt', response.token);
    // if (response.data.resultCode === 0) {
    //   let { userId } = response.data.data;
    //   dispatch(setAuthUserData(userId, email, true));
    // }
  })
  .catch((err) => {
    console.log(err)
  });
};

export default authReducer;
