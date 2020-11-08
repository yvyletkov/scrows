import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
// import reducer from "./reducer";
import { reducer as formReducer } from "redux-form";
import authReducer from "./AuthReducer";
import personalAreaReducer from "./PersonalAreaReducer";

const reducers = combineReducers({
  form: formReducer,
  // main: reducer,
  auth: authReducer,
  infoUser: personalAreaReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
