import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
// import reducer from "./reducer";
import { reducer as formReducer } from "redux-form";
import authReducer from "./AuthReducer";
import personalAreaReducer from "./PersonalAreaReducer";
import dealPageReducer from "./DealPageReducer";

const reducers = combineReducers({
  form: formReducer,
  auth: authReducer,
  infoUser: personalAreaReducer,
  deal: dealPageReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
